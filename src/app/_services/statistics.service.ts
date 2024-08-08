// src/app/_services/statistics.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private baseUrl = 'http://localhost:8080/api/v1/statistics';

  constructor(private http: HttpClient) { }

  getDocumentsByType(): Observable<any> {
    return this.http.get(`${this.baseUrl}/documents-by-type`);
  }

  getDocumentsConsultedByType(): Observable<any> {
    return this.http.get(`${this.baseUrl}/documents-consulted-by-type`);
  }

  getDocumentsEmailedByType(): Observable<any> {
    return this.http.get(`${this.baseUrl}/documents-emailed-by-type`);
  }

  getDocumentsByTypeAndAgency(): Observable<any> {
    return this.http.get(`${this.baseUrl}/documents-by-type-and-agency`);
  }
}
