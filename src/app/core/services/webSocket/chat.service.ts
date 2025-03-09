import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';  // ✅ Importation corrigée
import { Client, Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private stompClient!: Client;
  private messageSubject = new Subject<any>(); // Observable pour les messages

  constructor() {
    this.connect();
  }

  private connect() {
    const socket = new SockJS('http://localhost:9091/ws'); // ✅ Utilisation correcte de SockJS
    this.stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (msg) => console.log(msg),
      onConnect: () => {
        console.log('✅ WebSocket connecté');
        this.subscribeToMessages();
      },
      onStompError: (error) => {
        console.error('❌ Erreur WebSocket :', error);
      },
    });

    this.stompClient.activate();
  }

  private subscribeToMessages() {
    this.stompClient.subscribe('/user/queue/messages', (message) => {
      this.messageSubject.next(JSON.parse(message.body)); // ✅ JSON bien parsé
    });
  }

  sendMessage(message: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination: `/app/sendMessage`, // Keep this as "/app/sendMessage"
        body: JSON.stringify(message),
      });
      console.log('✅ Message envoyé avec succès :', message);
    } else {
      console.warn('⚠️ WebSocket non connecté, message non envoyé.');
    }
  }





  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }
}
