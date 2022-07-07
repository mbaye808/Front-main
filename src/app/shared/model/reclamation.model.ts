import { Moment } from 'moment';


export interface IReclamation {
  id?: number;
  etat?: string;
  ine?: string;
  nature?: string;
  dateDebut?: Date;
  dateFin?: Date;
  photo?: any;
  photoContentType?: string;
  description?: string;
  typeReclamation?: string;
  noteReclamation?: number;
  date?: Moment;
  enseignement?: any;
  note?: any;
  anneeAccademique?: any;  
}

export class Reclamation implements IReclamation {
  constructor(
    public id?: number,
    public etat?: string,
    public noteReclamation?: number,
    public date?: Moment,
    public enseignement?: string,
    public note?: any,
    public ine?: string,
    public nature?: string,
    public dateDebut?: Date,
    public dateFin?: Date,
    public photo?: any,
    public photoContentType?: string,
    public description?: string,
    public typeReclamation?: string,
    public anneeAccademique?: any
  ) {}
}
