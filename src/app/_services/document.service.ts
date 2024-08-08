import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DocumentDto } from '../_models/DocumentDto.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = `${environment.apiUrl}/api/v1/documents`;

  constructor(private http: HttpClient) {}

  getAllDocuments(): Observable<DocumentDto[]> {
    return this.http.get<DocumentDto[]>(`${this.apiUrl}/all`);
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
    return this.http.delete(`${this.apiUrl}/delete-document/${id}`);
  }

  deleteDelegation(delegationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-delegation/${delegationId}`);
  }
}
