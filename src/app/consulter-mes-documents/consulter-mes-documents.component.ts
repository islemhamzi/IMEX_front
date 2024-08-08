import { Component, OnInit } from '@angular/core';
import { DelegationService } from '../_services/delegation.service';
import { DocumentDto } from '../_models/DocumentDto.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-consulter-mes-documents',
  templateUrl: './consulter-mes-documents.component.html',
  styleUrls: ['./consulter-mes-documents.component.css']
})
export class ConsulterMesDocumentsComponent implements OnInit {
  delegatedDocuments: DocumentDto[] = [];
  error: string | null = null;

  constructor(private delegationService: DelegationService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadDelegatedDocuments();
  }

  loadDelegatedDocuments(): void {
    this.delegationService.getAllDocumentsDelegatedToMe().subscribe({
      next: documents => {
        console.log('Documents:', documents); // Log the documents
        this.delegatedDocuments = documents;
        this.error = null;
      },
      error: err => {
        console.error('Error fetching delegated documents:', err);
        this.error = 'Failed to load delegated documents';
      }
    });
  }
}
