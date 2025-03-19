import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChatService } from "../../core/services/webSocket/chat.service";
import { Message, MessageType } from "../../core/models/message/message.model";
import { Observable } from "rxjs";
import { User } from "../../core/models/user/user.model";
import { Store } from "@ngrx/store";
import { selectFilteredUsers } from "../../core/stores/user/user.reducer";
import { UserActions } from "../../core/stores/user/user.actions";
import { UserService } from "../../core/services/user/user.service";

@Component({
  selector: 'app-chat-ex',
  templateUrl: './chat-ex.component.html',
  styleUrls: ['./chat-ex.component.css']
})
export class ChatExComponent implements OnInit {
  messages: Message[] = [];
  filteredMessages: Message[] = [];
  newMessage: string = '';
  selectedReceiverId: number | null = null;
  users$: Observable<User[]>;
  selectedUser: User | null = null;
  private currentUserId!: number;
  lastMessagesMap: Map<number, string> = new Map();

  constructor(
    private webSocketService: ChatService,
    private store: Store,
    private userService: UserService,
    private cdRef: ChangeDetectorRef
  ) {
    this.users$ = this.store.select(selectFilteredUsers);

    this.userService.getCurrentUser().subscribe(user => {
      this.currentUserId = user.id;
      this.loadMessages();
    });
  }

  ngOnInit() {
    this.store.dispatch(UserActions.loadUsers());

    this.webSocketService.getMessages().subscribe((message) => {
      console.log("📥 Nouveau message reçu:", message);
      if (message.sender) {
        const messageWithSentStatus: Message = {
          ...message,
          senderId: message.sender.id,
          receiverId: message.receiver ? message.receiver.id : null,
          sent: message.sender.id === this.currentUserId,
          timestamp: new Date(message.timestamp),
          isRead: false,
          type: message.type || MessageType.TEXT,
        };

        this.messages.push(messageWithSentStatus);

        const otherUserId = messageWithSentStatus.sent ? messageWithSentStatus.receiverId : messageWithSentStatus.senderId;
        if (otherUserId !== null) {
          this.lastMessagesMap.set(otherUserId, messageWithSentStatus.content);
        }

        this.filterMessages();
        this.cdRef.detectChanges();
      }
    });
    this.webSocketService.waitForConnection().then(() => {
      this.webSocketService.fetchUserMessages();
    });
  }

  loadMessages() {
    if (this.currentUserId) {
      this.webSocketService.fetchMessagesForUser(this.currentUserId).subscribe(
        (messages) => {
          console.log("Messages chargés :", messages);
          this.messages = messages.map(msg => ({
            ...msg,
            senderId: msg.sender ? msg.sender.id : null,
            receiverId: msg.receiver ? msg.receiver.id : null,
            sent: msg.sender?.id === this.currentUserId,
            timestamp: new Date(msg.timestamp),
            type: msg.type || MessageType.TEXT,
          }));

          this.filterMessages();
          this.updateLastMessagesMap();
        },
        (error) => {
          console.error("Erreur lors du chargement des messages:", error);
        }
      );
    }
  }

  selectUser(user: User) {
    console.log("Utilisateur sélectionné: " + user.id);
    this.selectedUser = user;
    this.selectedReceiverId = user.id;
    this.filterMessages();
    this.cdRef.detectChanges();
  }

  filterMessages() {
    if (this.selectedUser && this.currentUserId) {
      console.log("Filtrage des messages avec selectedUser.id:", this.selectedUser.id);
      console.log("CurrentUserId:", this.currentUserId);

      this.filteredMessages = this.messages.filter(msg => {
        const condition1 = msg.senderId === this.currentUserId && msg.receiverId === this.selectedUser?.id;
        const condition2 = msg.senderId === this.selectedUser?.id && msg.receiverId === this.currentUserId;
        console.log(`Message ${msg.content} - senderId: ${msg.senderId}, receiverId: ${msg.receiverId}`);
        console.log(`Conditions: ${condition1} || ${condition2}`);
        return condition1 || condition2;
      });

      console.log("Nombre de messages filtrés:", this.filteredMessages.length);
    } else {
      console.log("Impossible de filtrer: selectedUser ou currentUserId manquant");
      this.filteredMessages = [];
    }
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedUser !== null) {
      const messagePayload: Message = {
        content: this.newMessage,
        senderId: this.currentUserId,
        receiverId: this.selectedUser.id,
        timestamp: new Date(),
        isRead: false,
        type: MessageType.TEXT,
        sent: true
      };

      this.messages.push(messagePayload);
      this.filteredMessages.push(messagePayload);
      this.webSocketService.sendMessage(messagePayload);

      this.lastMessagesMap.set(this.selectedUser.id, messagePayload.content);

      this.newMessage = '';

      this.cdRef.detectChanges();
    }
  }

  onSearchChange(event: any) {
    console.log(event.target.value);
    const value = event.target.value;
    this.store.dispatch(UserActions.filterUsers({ searchTerm: value }));
  }

  getLastMessageWithUser(userId: number): string {
    const messagesWithUser = this.messages.filter(msg =>
      (msg.senderId === this.currentUserId && msg.receiverId === userId) ||
      (msg.senderId === userId && msg.receiverId === this.currentUserId)
    );

    const sortedMessages = messagesWithUser.sort((a, b) =>
      b.timestamp.getTime() - a.timestamp.getTime()
    );

    return sortedMessages.length > 0 ? sortedMessages[0].content : 'Aucun message';
  }

  updateLastMessagesMap() {
    const userIds = new Set<number>();
    this.messages.forEach(msg => {
      if (msg.senderId !== this.currentUserId && msg.senderId !== null) userIds.add(msg.senderId);
      if (msg.receiverId !== this.currentUserId && msg.receiverId !== null) userIds.add(msg.receiverId);
    });

    userIds.forEach(userId => {
      const lastMessage = this.getLastMessageWithUser(userId);
      this.lastMessagesMap.set(userId, lastMessage);
    });
  }
}
