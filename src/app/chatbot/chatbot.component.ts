import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../_services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  messages: string[] = ['Bot: Hello! How can I assist you today?'];
  userMessage: string = '';

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {}

  sendMessage(): void {
    if (this.userMessage.trim()) {
      // Add the user's message to the chat
      this.messages.push('You: ' + this.userMessage);
  
      // Send the user's message to the backend and get the response
      this.chatbotService.getResponse(this.userMessage).subscribe(
        (response: any) => {
          console.log('Bot response:', response);  // Check the response in the console
          if (response && response.message) {
            this.messages.push('Bot: ' + response.message); // Display the bot's response
          } else {
            this.messages.push('Bot: Sorry, I didn’t understand the response.');
          }
        },
        (error) => {
          console.error('Error from backend:', error); // Log error for debugging
          this.messages.push('Bot: Sorry, something went wrong.');
        }
      );
  
      // Clear the input field
      this.userMessage = '';
    }
  }
  
  

  closeChatbot(): void {
    this.messages = [];
  }
}
