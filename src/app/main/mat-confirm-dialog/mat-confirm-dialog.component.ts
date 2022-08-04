import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReclamationService } from 'app/service/reclamation.service';
import { Reclamation } from 'app/shared/model/reclamation.model';


@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './mat-confirm-dialog.component.html',
  styleUrls: ['./mat-confirm-dialog.component.scss']
})
export class MatConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<MatConfirmDialogComponent>) { }

  ngOnInit(){
  }
 
  closeDialog() {
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close('oui');
  }
}