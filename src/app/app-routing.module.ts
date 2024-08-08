import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './_helpers/auth.guard';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { AdminComponent } from './admin/admin.component';
import { GestionDesUtilisateursComponent } from './gestion-des-utilisateurs/gestion-des-utilisateurs.component';
import { JournalActiviteComponent } from './journal-activite/journal-activite.component';
import { DocumentComponent } from './document/document.component';
import { DeleguerDocumentsComponent } from './deleguer-documents/deleguer-documents.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsulterMesDocumentsComponent } from './consulter-mes-documents/consulter-mes-documents.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    data: { roles: ['ADMIN', 'USER', 'CHEF_AGENCE', 'TFJO'] }
  },
  {
    path: 'tableau-de-bord',
    component: DashboardComponent,
    canActivate: [authGuard],
    data: { roles: ['ADMIN', 'USER', 'CHEF_AGENCE', 'TFJO'] }
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'gestion-des-utilisateurs',
    component: GestionDesUtilisateursComponent,
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'documents',
    component: DocumentComponent,
    canActivate: [authGuard],
    data: { roles: ['ADMIN', 'USER', 'CHEF_AGENCE', 'TFJO'] }
  },
  {
    path: 'journal-activite',
    component: JournalActiviteComponent,
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] }
  },
  {
    path: 'forbidden',
    component: AccessDeniedComponent
  },
  {
    path: 'deleguer-documents',
    component: DeleguerDocumentsComponent,
    canActivate: [authGuard],
    data: { roles: ['ADMIN', 'USER', 'CHEF_AGENCE', 'TFJO'] }
  },

  {
    path: 'consulter-mes-documents', // Ajoutez cette route
    component: ConsulterMesDocumentsComponent,
    canActivate: [authGuard],
    data: { roles: ['ADMIN', 'USER', 'CHEF_AGENCE', 'TFJO'] }
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
