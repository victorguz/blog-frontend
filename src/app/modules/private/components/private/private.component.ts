import { LOCAL_VISIBILIDAD_SIDEBAR } from '../../../../core/constants.config';
import { Component, OnInit, OnChanges } from '@angular/core';
import { getFromLocal } from '../../../../core/services/functions.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
})
export class PrivateComponent implements OnInit, OnChanges {
  expand = getFromLocal(LOCAL_VISIBILIDAD_SIDEBAR) || false;
  constructor() {}
  ngOnInit(): void {}
  ngOnChanges(): void {}
}
