import { InscriptionService } from './../../service/inscription.service';

import { IInscription } from './../../shared/model/inscription.model';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


import { DemandeService } from './demande.service';


import { IDemande, Demande } from '../../shared/model/demande.model';

@Component({
  selector: 'demande-update',
  templateUrl: './demande-update.component.html',
})
export class DemandeUpdateComponent implements OnInit {
  isSaving = false;
  inscriptions: IInscription[] = [];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    semestre: [],
    etat: [],
    inscription: [null, Validators.required],
  });

  constructor(
    protected demandeService: DemandeService,
    protected inscriptionService: InscriptionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demande }) => {
      this.updateForm(demande);

      this.inscriptionService.query().subscribe((res: HttpResponse<IInscription[]>) => (this.inscriptions = res.body || []));
    });
  }

  updateForm(demande: IDemande): void {
    this.editForm.patchValue({
      id: demande.id,
      date: demande.date,
      semestre: demande.semestre,
      etat: demande.etat,
      inscription: demande.inscription,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const demande = this.createFromForm();
    if (demande.id !== undefined) {
      this.subscribeToSaveResponse(this.demandeService.update(demande));
    } else {
      this.subscribeToSaveResponse(this.demandeService.create(demande));
    }
  }

  private createFromForm(): IDemande {
    return {
      ...new Demande(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      semestre: this.editForm.get(['semestre'])!.value,
      etat: this.editForm.get(['etat'])!.value,
      inscription: this.editForm.get(['inscription'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDemande>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IInscription): any {
    return item.id;
  }
}
