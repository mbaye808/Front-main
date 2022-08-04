

import { Component, OnInit } from '@angular/core';
import {fuseAnimations} from '../../../@fuse/animations';

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.scss'],
  animations : fuseAnimations
})
export class AlumniComponent implements OnInit {
   

  constructor() {

  }

  ngOnInit(): void {
  }

}