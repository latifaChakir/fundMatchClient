import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private stompClient!: Client;
  private notificationSubject = new Subject<string>();
  private currentUserId!: number;

  constructor(private userService: UserService) {
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
        console.log("Préparation à la connexion avec le token");
      },
      onConnect: () => {
        this.subscribeToNotifications();
        console.log('WebSocket connecté pour les notifications');
      },
      onStompError: (error) => {
        console.error(' Erreur WebSocket :', error);
      }
    });

    this.stompClient.activate();
  }

  private subscribeToNotifications() {
    this.stompClient.subscribe('/topic/events', (message) => {
      console.log('Notification brute reçue:', message);
      try {
        const notificationData = message.body;
        console.log('Notification après parsing:', notificationData);
        this.notificationSubject.next(notificationData);
      } catch (error) {
        console.error('Erreur lors du parse de la notification:', error);
      }
    });

    console.log('Abonné au canal de notifications');
  }

  getNotifications() {
    return this.notificationSubject.asObservable();
  }
}
