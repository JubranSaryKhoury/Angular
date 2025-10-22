import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-root',
  imports: [ChatComponent],
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent {}
