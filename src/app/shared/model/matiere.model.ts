import { ICours } from 'app/shared/model/cours.model';
import { IClasse } from 'app/shared/model/classe.model';

export interface IMatiere {
  id?: number;
  libelle?: string;
  module?: string;
  cours?: ICours[];
  classe?: IClasse;
}

export class Matiere implements IMatiere {
  constructor(public id?: number, public libelle?: string, public module?: string, public cours?: ICours[], public classe?: IClasse) {}
}
