import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DocumentDto } from '../_models/DocumentDto.model';

@Injectable({
  providedIn: 'root'
})
export class DelegationService {
  private apiUrl = `${environment.apiUrl}/api/v1/delegations`;

  constructor(private http: HttpClient) {}

  getAllDocumentsDelegatedToMe(): Observable<DocumentDto[]> {
    return this.http.get<DocumentDto[]>(`${this.apiUrl}/documents-delegated-to-me`);
  }

  createDelegation(delegationRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, delegationRequest);
  }

  downloadDocument(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${id}`, { responseType: 'blob' });
  }

  sendEmail(id: number, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send/${id}`, null, { params: { email } });
  }

  viewDocument(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/view/${id}`, { responseType: 'blob' });
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  getUserEmail(): Observable<{ email: string }> {
    return this.http.get<{ email: string }>(`${environment.apiUrl}/api/v1/users/email`);
  }
}

