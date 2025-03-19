import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { UserService } from "../user/user.service";
import { Message } from "../../models/message/message.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private api = `${environment.apiUrl}/messages`;

  private stompClient!: Client;
  private messageSubject = new Subject<any>();
  private currentUserId!: number;

  constructor(private userService: UserService, private http: HttpClient) {
    this.userService.getCurrentUser().subscribe(user => {
      this.currentUserId = user.id;
      this.connect();
    });
  }

  private connect() {
    const token = localStorage.getItem("token");
    console.log('JWT Token:', token);

    const socket = new SockJS('http://localhost:9091/ws');

    this.stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (msg) => console.log(msg),
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      beforeConnect: () => {
        console.log("Preparing to connect with token");
      },
      onConnect: () => {
        this.subscribeToMessages();
        console.log('WebSocket connecté');
      },
      onStompError: (error) => {
        console.error('Erreur WebSocket :', error);
      }
    });

    this.stompClient.activate();
  }

  sendMessage(message: any) {
    if (this.stompClient && this.stompClient.connected) {
      const token = localStorage.getItem("token");

      this.stompClient.publish({
        destination: `/app/sendMessage`,
        body: JSON.stringify(message),
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Message envoyé avec succès :', message);
    } else {
      console.warn('WebSocket non connecté, message non envoyé.');
    }
  }

  private subscribeToMessages() {
    this.stompClient.subscribe(`/user/${this.currentUserId}/queue/messages`, (message) => {
      console.log('Message brut reçu:', message);
      try {
        const messageData = JSON.parse(message.body);
        console.log('Message après parsing:', messageData);
        this.messageSubject.next(messageData);
      } catch (error) {
        console.error('Erreur lors du parse du message:', error);
      }
    });

    console.log('Abonné au canal de messages');
  }

  fetchUserMessages() {
    if (this.stompClient && this.stompClient.connected) {
      console.log("Demande de récupération des messages envoyée...");
      this.stompClient.publish({
        destination: "/app/getUserMessages",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
    } else {
      console.warn("WebSocket non encore connecté, attente...");
      this.waitForConnection().then(() => this.fetchUserMessages());
    }
  }

  public waitForConnection(): Promise<void> {
    return new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (this.stompClient && this.stompClient.connected) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 500);
    });
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  fetchMessagesForUser(userId: number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.api}/user/${userId}`);
  }
}
