import { IEtudiant } from 'app/shared/model/etudiant.model';
export interface INote {
  id?: number;
  tp?: number;
  moyenne?: number;
  cc?: number;
  rattrapage?: number;
  renonciation?: boolean;
  ds?: number;
  i?: any;
  email?: any;
  pointJury?: number;
  pointjuryR?: number;
  absence?: boolean;
  elementConstitutif?: any;
  etudiant?: IEtudiant;
  anneeAccademique?: any;
}

export class Note implements INote {
  constructor(
    public id?: number,
    public tp?: number,
    public moyenne?: number,
    public cc?: number,
    public rattrapage?: number,
    public renonciation?: boolean,
    public ds?: number,
    public pointJury?: number,
    public pointjuryR?: number,
    public i?: any,
    public email?: any,
    public absence?: boolean,
    public elementConstitutif?: any,
    public etudiant?: IEtudiant,
    public anneeAccademique?: any
  ) {
    this.renonciation = this.renonciation || false;
    this.absence = this.absence || false;
  }
}
