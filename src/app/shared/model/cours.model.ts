import { IMatiere } from 'app/shared/model/matiere.model';
import { IEnseignant } from 'app/shared/model/enseignant.model';

export interface ICours {
  id?: number;
  libelle?: string;
  cheminFichier?: string;
  estAjoute?: boolean;
  matiere?: IMatiere;
  enseignant?: IEnseignant;
}

export class Cours implements ICours {
  constructor(
    public id?: number,
    public libelle?: string,
    public cheminFichier?: string,
    public estAjoute?: boolean,
    public matiere?: IMatiere,
    public enseignant?: IEnseignant
  ) {
    this.estAjoute = this.estAjoute || false;
  }
}
