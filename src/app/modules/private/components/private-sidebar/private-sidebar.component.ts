import { Component, OnInit } from '@angular/core';
import { MenuOption } from '../../../../core/interfaces/shared.interfaces';
import { MenuService } from '../../../../core/services/menu.service';

@Component({
  selector: 'app-private-sidebar',
  templateUrl: './private-sidebar.component.html',
  styleUrls: ['./private-sidebar.component.scss'],
})
export class PrivateSidebarComponent implements OnInit {
  sideData: MenuOption[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.sideData = this.menuService.getSidebarData();
  }
}
