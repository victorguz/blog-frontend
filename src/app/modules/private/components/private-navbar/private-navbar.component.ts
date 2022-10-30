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
export class PrivateNavbarComponent implements OnInit {
  @Output() isExpand = new EventEmitter();

  expand = getFromLocal(LOCAL_VISIBILIDAD_SIDEBAR) || false;
  usuario!: UsuarioAuth;
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    try {
      this.usuario = this.auth.usuario;
    } catch (error) {}
  }

  cerrarSesion() {
    this.auth.cerrarSesion();
  }

  changeExpand() {
    setOnLocal(LOCAL_VISIBILIDAD_SIDEBAR, !this.expand);
    this.expand = getFromLocal(LOCAL_VISIBILIDAD_SIDEBAR) || false;
    this.isExpand.emit(this.expand);
  }

  modalCambiarContrasena() {
    this.auth.modalCambiarContrasena();
  }
}
