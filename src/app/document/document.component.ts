import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DocumentService } from '../_services/document.service';
import { DocumentDto } from '../_models/DocumentDto.model';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  documents: DocumentDto[] = [];
  pdfUrl: SafeResourceUrl | null = null;
  emailModalVisible = false;
  email = '';
  currentDocumentId: number | null = null;

  constructor(private documentService: DocumentService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.documentService.getAllDocuments().subscribe((data: DocumentDto[]) => {
      this.documents = data;
    });
  }

  download(id: number): void {
    this.documentService.downloadDocument(id).subscribe((data) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `document_${id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Download error:', error);
    });
  }

  openEmailModal(documentId: number): void {
    this.currentDocumentId = documentId;
    this.emailModalVisible = true;
  }

  closeEmailModal(): void {
    this.emailModalVisible = false;
    this.email = '';
    this.currentDocumentId = null;
  }

  sendEmail(): void {
    if (this.currentDocumentId && this.email) {
      this.documentService.sendEmail(this.currentDocumentId, this.email).subscribe(
        response => {
          console.log(response.message);
          alert(response.message);
          this.closeEmailModal();
        },
        error => {
          console.error('Error sending email:', error);
          alert('Failed to send email');
        }
      );
    }
  }

  viewDocument(id: number): void {
    this.documentService.viewDocument(id).subscribe({
      next: (data) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      },
      error: (err) => console.error('Error viewing document:', err)
    });
  }

  closeViewer(): void {
    this.pdfUrl = null;
  }

  deleteItem(document: DocumentDto): void {
    if (document.delegationId) {
      this.deleteDelegation(document.delegationId);
    } else {
      this.deleteDocument(document.idDocument);
    }
  }

  deleteDocument(id: number): void {
    this.documentService.deleteDocument(id).subscribe({
      next: () => {
        this.documents = this.documents.filter(doc => doc.idDocument !== id);
        console.log('Document deleted successfully');
      },
      error: (err) => console.error('Error deleting document:', err)
    });
  }

  deleteDelegation(delegationId: number): void {
    this.documentService.deleteDelegation(delegationId).subscribe({
      next: () => {
        this.documents = this.documents.filter(doc => doc.delegationId !== delegationId);
        console.log('Delegation deleted successfully');
      },
      error: (err) => console.error('Error deleting delegation:', err)
    });
  }
}
