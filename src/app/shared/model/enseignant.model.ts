import { ICours } from 'app/shared/model/cours.model';
import { IUser } from 'app/core/user/user.model';

export interface IEnseignant {
  id?: number;
  specialite?: string;
  cours?: ICours[];
  user?: IUser;
}

export class Enseignant implements IEnseignant {
  constructor(public id?: number, public specialite?: string, public cours?: ICours[], public user?: IUser) {}
}
