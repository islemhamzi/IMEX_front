import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir les utilisateurs pour l'admin
  getUsersForAdmin(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`, { withCredentials: true });
  }

  // Méthode pour obtenir le contenu public des utilisateurs
  getUserPublicContent(): Observable<string> {
    return this.http.get(`${this.baseUrl}`, { responseType: 'text' });
  }

  // Méthode pour obtenir le contenu public de l'admin
  getAdminPublicContent(): Observable<string> {
    return this.http.get(`${this.baseUrl}/documents/agency`, { responseType: 'text' });
  }

  // Méthode pour obtenir les documents TFJO
  getTfjoContent(): Observable<string> {
    return this.http.get(`${this.baseUrl}/documents/tfjo`, { responseType: 'text' });
  }

  updateUserStatus(matriculeLdap: string, newStatus: string): Observable<any> {
    const url = `${this.baseUrl}/users/${matriculeLdap}/status`;
    return this.http.put(url, { status: newStatus });
  }


  updateUserRoles(matriculeLdap: string, roles: string[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${matriculeLdap}/roles`, roles);
  }
  getDocuments(): Observable<string> {
    return this.http.get(`${this.baseUrl}/documents`, { responseType: 'text' });
  }
}
