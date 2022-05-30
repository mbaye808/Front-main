import { Moment } from 'moment';
import { INote } from './note.model';


export interface IReclamation {
  id?: number;
  etat?: string;
  noteReclamation?: number;
  date?: Moment;
  enseignement?: string;
  note?: INote;
}

export class Reclamation implements IReclamation {
  constructor(
    public id?: number,
    public etat?: string,
    public noteReclamation?: number,
    public date?: Moment,
    public enseignement?: string,
    public note?: INote
  ) {}
}
