import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../_models/user.model';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

export interface AuthResponseData {
  id: number;
  firstName: string;
  lastName: string;
  agence: string;
  email: string;
  matricule: string;
  roles: string[];
  creationDate: string;
  accountStatus: string;
  matriculeLdap: string;
  matriculeAmplitude: string;
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AuthenticatedUser$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {}

  login(matricule: string, password: string) {
    return this.http.post<AuthResponseData>('http://localhost:8080/api/v1/auth/authenticate', { matricule, password })
      .pipe(
        catchError(err => {
          let errorMessage = 'Une erreur inconnue s\'est produite !';
          if (err.error && err.error.message) {
            errorMessage = err.error.message;
          }
          if (err.error && err.error.message === 'Votre compte est désactivé') {
            errorMessage = 'Votre compte est désactivé';
          }
          return throwError(() => new Error(errorMessage));
        }),
        tap(user => {
          if (user.accountStatus === 'INACTIVE') {
            throw new Error('Votre compte est désactivé');
          }
          const extractedUser: User = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            agence: user.agence,
            email: user.email,
            matricule: user.matricule,
            roles: user.roles,
            creationDate: user.creationDate,
            accountStatus: user.accountStatus,
            matriculeLdap: user.matriculeLdap,
            matriculeAmplitude: user.matriculeAmplitude
          };
          this.storageService.saveUser(extractedUser);
          localStorage.setItem('access_token', user.access_token);
          localStorage.setItem('refresh_token', user.refresh_token);
          this.AuthenticatedUser$.next(extractedUser);
        })
      );
  }

  getAuthToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  autoLogin() {
    const userData = this.storageService.getSavedUser();
    if (!userData) {
      return;
    }
    this.AuthenticatedUser$.next(userData);
  }

  logout() {
    this.http.post('http://localhost:8080/api/v1/auth/logout', {}, {
      withCredentials: true
    }).subscribe({
      next: () => {
        this.storageService.clean();
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.AuthenticatedUser$.next(null);
        this.router.navigate(['/login']);
      }
    });
  }

  refreshToken() {
    return this.http.post<AuthResponseData>('http://localhost:8080/api/v1/auth/refresh-token', {
      refreshToken: this.getRefreshToken()
    }).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
      }),
      catchError(err => {
        this.logout();
        return throwError(err);
      })
    );
  }
}
