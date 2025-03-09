import {Component, OnInit} from '@angular/core';
import {ChatService} from "../core/services/webSocket/chat.service";

@Component({
  selector: 'app-chat-ex',
  templateUrl: './chat-ex.component.html',
  styleUrl: './chat-ex.component.css'
})
export class ChatExComponent implements OnInit{
  messages: any[] = [];
  newMessage: string = '';

  constructor(private webSocketService: ChatService) {}

  ngOnInit() {
    this.webSocketService.getMessages().subscribe((message) => {
      if (message) {
        this.messages.push(message);
      }
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const messagePayload = {
        content: this.newMessage,
        senderId: 1, // Remplace par l'ID de l'utilisateur connecté
        receiverId: 4  // Remplace par l'ID du destinataire
      };
      this.webSocketService.sendMessage(messagePayload);
      this.newMessage = '';
    }
  }
}
