// src/app/_models/user.model.ts
export interface User {
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
}
