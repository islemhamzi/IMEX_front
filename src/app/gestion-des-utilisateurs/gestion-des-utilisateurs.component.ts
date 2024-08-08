import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ActivityLogService } from '../_services/activity-log.service';
import { User } from '../_models/user.model';
import { ActivityLog } from '../_models/activity-log.model';

@Component({
  selector: 'app-gestion-des-utilisateurs',
  templateUrl: './gestion-des-utilisateurs.component.html',
  styleUrls: ['./gestion-des-utilisateurs.component.css']
})
export class GestionDesUtilisateursComponent implements OnInit {
  users: User[] = [];
  showModal: boolean = false;
  selectedUser: User | null = null;
  allRoles: string[] = ['ADMIN', 'USER', 'TFJO', 'CHEF_AGENCE'];
  currentUser: User | null = null; // Assume we have a way to get the current logged-in user
  currentIp: string = '192.168.1.1'; // Replace this with the actual IP retrieval logic

  constructor(private userService: UserService, private activityLogService: ActivityLogService) { }

  ngOnInit(): void {
    this.userService.getUsersForAdmin().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (err) => console.error(err)
    });

    // Assume we have a way to get the current logged-in user
    this.currentUser = {
      id: 1,
      firstName: 'Current',
      lastName: 'User',
      agence: 'Agence1',
      email: 'currentuser@example.com',
      matricule: 'currentuser',
      roles: ['ADMIN'],
      creationDate: new Date().toISOString(),
      accountStatus: 'ACTIVE',
      matriculeLdap: 'currentuser_ldap',
      matriculeAmplitude: 'currentuser_amplitude'
    };
  }

  changeUserStatus(user: User): void {
    const newStatus = user.accountStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    this.userService.updateUserStatus(user.matriculeLdap, newStatus).subscribe({
      next: () => {
        user.accountStatus = newStatus; // Update the status locally
        const action = `${this.currentUser?.firstName} ${this.currentUser?.lastName} en tant que ${this.currentUser?.roles.join(', ')} a ${newStatus === 'ACTIVE' ? 'activé' : 'désactivé'} le compte de ${user.firstName} ${user.lastName} à la date ${new Date().toISOString()} dont son adresse IP ${this.currentIp}`;
        this.logActivity(action);
      },
      error: (err) => {
        console.error('Error updating user status:', err);
        alert(`Failed to update user status: ${err.message}`);
      }
    });
  }

  logActivity(action: string): void {
    const activityLog: ActivityLog = {
      action,
      date: new Date().toISOString(),
      user: `${this.currentUser?.firstName} ${this.currentUser?.lastName}`,
      role: this.currentUser?.roles.join(', ') || '',
      ip: this.currentIp,
      username: this.currentUser?.matricule || ''
    };
    this.activityLogService.logActivity(activityLog).subscribe({
      error: (err) => console.error(err)
    });
  }

  openRoleModal(user: User): void {
    this.selectedUser = { ...user }; // Make a copy of the user to avoid direct modifications
    this.showModal = true;
  }

  closeRoleModal(): void {
    this.selectedUser = null;
    this.showModal = false;
  }

  hasRole(user: User, role: string): boolean {
    return user.roles.includes(role);
  }

  addRole(role: string): void {
    if (this.selectedUser) {
      this.userService.updateUserRoles(this.selectedUser.matriculeLdap, [...this.selectedUser.roles, role]).subscribe({
        next: () => {
          if (this.selectedUser) { // Check again if selectedUser is not null
            this.selectedUser.roles.push(role);
            this.updateUserRolesInList(this.selectedUser.matriculeLdap, [...this.selectedUser.roles]);

            const action = `${this.currentUser?.firstName} ${this.currentUser?.lastName} en tant que ${this.currentUser?.roles.join(', ')} a ajouté le profil ${role} pour ${this.selectedUser.firstName} ${this.selectedUser.lastName} à la date ${new Date().toISOString()} dont son adresse IP ${this.currentIp}`;
            this.logActivity(action);
          }
        },
        error: (err) => console.error(err)
      });
    }
  }

  removeRole(role: string): void {
    if (this.selectedUser) {
      const newRoles = this.selectedUser.roles.filter(r => r !== role);
      this.userService.updateUserRoles(this.selectedUser.matriculeLdap, newRoles).subscribe({
        next: () => {
          if (this.selectedUser) { // Check again if selectedUser is not null
            this.selectedUser.roles = newRoles;
            this.updateUserRolesInList(this.selectedUser.matriculeLdap, newRoles);

            const action = `${this.currentUser?.firstName} ${this.currentUser?.lastName} en tant que ${this.currentUser?.roles.join(', ')} a supprimé le profil ${role} pour ${this.selectedUser.firstName} ${this.selectedUser.lastName} à la date ${new Date().toISOString()} dont son adresse IP ${this.currentIp}`;
            this.logActivity(action);
          }
        },
        error: (err) => console.error(err)
      });
    }
  }

  updateUserRolesInList(matriculeLdap: string, newRoles: string[]): void {
    const user = this.users.find(u => u.matriculeLdap === matriculeLdap);
    if (user) {
      user.roles = newRoles;
    }
  }
}
