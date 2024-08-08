// src/app/_models/document.model.ts
export interface Document {
  idDocument: number;
  numeroCompte: string;
  codeClient: string;
  typeDocument: string;
  dateEdition: string;
  dateComptable: string;
  nomDocument: string;
  cheminDocument: string;
  userMatricule: string;
  userEmail: string;
  agenceCode: string;
  agenceEdition: string;
}
