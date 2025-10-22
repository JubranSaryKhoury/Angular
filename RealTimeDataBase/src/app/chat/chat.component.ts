import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  Database,
  listVal,
  push,
  ref,
  query,
  orderByChild,
} from '@angular/fire/database';

interface ChatMessage {
  text: string;
  timestamp: number;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  messages$!: Observable<ChatMessage[]>;
  newMessage: string = '';

  constructor(private db: Database) {}

  ngOnInit() {
    const messagesRef = ref(this.db, 'messages');
    const messagesQuery = query(messagesRef, orderByChild('timestamp'));
    this.messages$ = listVal<ChatMessage>(messagesQuery);
  }

  async sendMessage() {
    if (this.newMessage.trim() === '') return;

    const messagesRef = ref(this.db, 'messages');
    const result = await push(messagesRef, {
      text: this.newMessage,
      timestamp: Date.now(),
    });
    console.log('Message pushed to the database:', result);
    this.newMessage = '';
  }
}
