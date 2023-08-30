import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MAT_MENU_SCROLL_STRATEGY,
} from '@angular/material/menu';
import {
  Overlay,
  BlockScrollStrategy,
  RepositionScrollStrategy,
} from '@angular/cdk/overlay';

const isToucheDevice = () => {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
};
const scrollBlockFactory = (overlay: Overlay): (() => BlockScrollStrategy) => {
  return () => overlay.scrollStrategies.block();
};

const scrollRepositionFactory = (
  overlay: Overlay
): (() => RepositionScrollStrategy) => {
  return () => overlay.scrollStrategies.reposition();
};


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [
    {
      provide: MAT_MENU_SCROLL_STRATEGY,
      useFactory: isToucheDevice()
        ? scrollBlockFactory
        : scrollRepositionFactory,
      deps: [Overlay],
    },
  ],
})
export class NavbarComponent {}
