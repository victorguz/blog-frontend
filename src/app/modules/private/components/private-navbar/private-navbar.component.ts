import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { getFromLocal, setOnLocal } from '../../../../core/services/functions.service';
import { AuthService } from '../../../../core/auth/auth.service';
import { LOCAL_VISIBILIDAD_SIDEBAR } from '../../../../core/constants.config';
import { UsuarioAuth } from '../../../../core/auth/auth.interfaces';
@Component({
  selector: 'app-private-navbar',
  templateUrl: './private-navbar.component.html',
  styleUrls: ['./private-navbar.component.scss'],
})
export class PrivateNavbarComponent  {

}
