import { Injectable } from '@angular/core';
import {Client} from "@stomp/stompjs";
import {Subject} from "rxjs";
import {UserService} from "../user/user.service";
import SockJS from "sockjs-client";

@Injectable({
  providedIn: 'root'
})
export class MessageNotifService {
  private stompClient!: Client;
  private NotificationsMessagesubject = new Subject<string>();
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
        this.subscribeToNotificationsMessages();
        console.log('✅ WebSocket connecté pour les NotificationsMessages');
      },
      onStompError: (error) => {
        console.error('❌ Erreur WebSocket :', error);
      }
    });

    this.stompClient.activate();
  }

  private subscribeToNotificationsMessages() {
    this.stompClient.subscribe('/topic/messages', (message) => {
      console.log('📩 Notification brute reçue:', message);
      try {
        const notificationData = message.body;
        console.log('✅ Notification après parsing:', notificationData);
        this.NotificationsMessagesubject.next(notificationData);
      } catch (error) {
        console.error('❌ Erreur lors du parse de la notification:', error);
      }
    });

    console.log('✅ Abonné au canal de NotificationsMessages');
  }

  getNotificationsMessages() {
    return this.NotificationsMessagesubject.asObservable();
  }
}
