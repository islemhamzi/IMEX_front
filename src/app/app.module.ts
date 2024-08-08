import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

import { HttpInterceptor } from './_helpers/http.interceptor';
import { HeaderComponent } from './header/header.component';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { AdminComponent } from './admin/admin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GestionDesUtilisateursComponent } from './gestion-des-utilisateurs/gestion-des-utilisateurs.component';
import { JournalActiviteComponent } from './journal-activite/journal-activite.component';
import { DocumentComponent } from './document/document.component';
import { DeleguerDocumentsComponent } from './deleguer-documents/deleguer-documents.component';
import { ConsulterMesDocumentsComponent } from './consulter-mes-documents/consulter-mes-documents.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    LoginComponent,
    HeaderComponent,
    AccessDeniedComponent,
    SidebarComponent,
    GestionDesUtilisateursComponent,
    JournalActiviteComponent,
    DocumentComponent,
    DeleguerDocumentsComponent,
    ConsulterMesDocumentsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule,
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
