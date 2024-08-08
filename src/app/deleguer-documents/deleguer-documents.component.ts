import { Component, OnInit } from '@angular/core';
import { DelegationService } from '../_services/delegation.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-deleguer-documents',
  templateUrl: './deleguer-documents.component.html',
  styleUrls: ['./deleguer-documents.component.css']
})
export class DeleguerDocumentsComponent implements OnInit {
  delegatorMatricule: string | null = null;

  constructor(private delegationService: DelegationService, private authService: AuthService) {}

  ngOnInit(): void {
    this.delegatorMatricule = this.authService.AuthenticatedUser$.value?.matricule || null;
  }

  onSubmit(form: NgForm) {
    if (form.valid && this.delegatorMatricule) {
      const delegationRequest = {
        ...form.value,
        delegatorUsername: this.delegatorMatricule
      };

      this.delegationService.createDelegation(delegationRequest).subscribe({
        next: response => alert('Délégation créée avec succès'),
        error: err => console.error('Erreur lors de la création de la délégation :', err)
      });
    }
  }
}
