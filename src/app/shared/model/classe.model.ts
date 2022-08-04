import { INiveau } from 'app/shared/model/niveau.model';

export interface IClasse {
  id?: number;
  libelle?: string;
  niveau?: INiveau;
  specialite?: string;
  
}

export class Classe implements IClasse {
  constructor(public id?: number, public libelle?: string, public niveau?: INiveau, public specialite?: string) {}
}
