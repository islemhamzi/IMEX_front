import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'http://localhost:8080/chat/send'; // Backend URL

  constructor(private http: HttpClient) {}

  getResponse(userMessage: string): Observable<any> {
    const messageRequest = { message: userMessage }; // Request payload
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(this.apiUrl, messageRequest, { headers });
  }
}
