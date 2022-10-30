import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { isNotEmpty, isString } from 'class-validator';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { toTitleCase } from '../../../../core/services/functions.service';

@Component({
  selector: 'aurora-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class AuroraTableComponent implements OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() clickRow = new EventEmitter<any[]>();
  @Output() clickRefresh = new EventEmitter<any>();
  @Output() changePageCustomPaginator = new EventEmitter<any>();

  @Input() multipleSelection: boolean = false;
  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Input() showTableOnlyOnSearch: boolean = false;
  @Input() lengthCustomPaginator: number = 0;
  @Input() CurrentPageCustomPaginator: number = 0;
  @Input() sizePageCustomPaginator: number = 0;

  @Input() columns: AuroraTableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actionColumnName: string = 'Acciones';
  @Input() actions: AuroraActionColumn[] = [];
  @Input() valueSearch: string = '';
  @Output() filteredData = new EventEmitter<any[]>();
  @Input() actionsOrientation: 'start' | 'end' | 'center' = 'center';
  @Input() selectedItems: any[] = [];

  displayedColumns: string[] = this.columns.map((value) => {
    return value.name;
  });

  dataSource = new MatTableDataSource<Set<any>>();
  selected = new Set<any>();
  showTable: boolean = true;

  constructor(
    public router: Router,
    private paginatorIntl: MatPaginatorIntl,
    private cdRef: ChangeDetectorRef
  ) {
    this.paginatorIntl.itemsPerPageLabel = 'Registros por página';
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setShowTable();
    if (changes['valueSearch']) {
      this.applyFilter();
    }
    if (changes['data'] || changes['columns'] || changes['actions']) {
      this.setData();
      this.setColumns();
      this.setActionsOnData();
    }
    if (changes['selectedItems']) {
      this.selected = new Set<any>(this.selectedItems);
    }
    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {}

  setColumns() {
    //Si no viene el parametro de columnas por defecto, se llena desde el parámetro "data"
    if (this.columns.length == 0 && this.data.length > 0) {
      for (const key in this.data[0]) {
        if (
          Object.prototype.hasOwnProperty.call(this.data[0], key) &&
          !key.toLowerCase().includes('_id')
        ) {
          this.columns.push({
            name: key,
            title: toTitleCase(key),
          });
        }
      }
    }
    this.displayedColumns = this.columns.map((value) => {
      return value.name;
    });
  }

  setActionsOnData() {
    if (
      this.actions &&
      Array.isArray(this.actions) &&
      this.actions.length &&
      this.data &&
      Array.isArray(this.data) &&
      this.data.length
    ) {
      this.data.forEach((element, idx) => {
        this.data[idx]['actions'] = this.actions;
      });
    }
  }

  setData() {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter() {
    this.valueSearch = this.valueSearch
      ? this.valueSearch.trim().toLowerCase()
      : '';
    this.dataSource.filter = this.valueSearch;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.setShowTable();
    this.filteredData.emit(this.dataSource.filteredData);
  }

  /**
   * Para determinar si se verán los datos de la tabla
   * @returns
   */
  setShowTable() {
    if (this.showTableOnlyOnSearch) {
      this.showTable = this.valueSearch ? true : false;
    }
  }

  addRowToItems(row: any) {
    if (this.multipleSelection) {
      if (this.selected.has(row)) {
        this.selected.delete(row);
      } else {
        this.selected.add(row);
      }
    } else {
      if (this.selected.has(row)) {
        this.selected.clear();
      } else {
        this.selected.clear();
        this.selected.add(row);
      }
    }
    this.clickRow.emit(Array.from(this.selected));
  }

  render(item: AuroraTableColumn, row: any) {
    let element: any = {};
    let result: any = '';
    for (const column in row) {
      if (Object.prototype.hasOwnProperty.call(row, column)) {
        element[column] = row[column] ? row[column] : '';
      }
    }
    let value = element[item.name];
    if (item.render) {
      result = item.render(value, row);
    } else if (isString(value) && isNaN(Number(value))) {
      result = value;
    } else if (!isNaN(Number(value))) {
      result = Number(value);
      result = result == Infinity ? value + '' : result;
    } else {
      result = JSON.stringify(value);
    }
    result = result + ''; //Convertir en string
    result = result.length > 40 ? result.substring(0, 40) + '...' : result;
    return result ? result : '';
  }

  getIcon(item: any, icon?: string | ((row: any) => string)) {
    const isIcon = isNotEmpty(icon) && isString(icon);
    const isFunction = isNotEmpty(icon) && typeof icon == 'function';
    return isIcon ? icon : isFunction ? icon(item) : 'check';
  }

  isDisabledAction(action: AuroraActionColumn, row: any) {
    if (typeof action.disabled == 'function') {
      return action.disabled(row);
    } else {
      return action.disabled ? true : false;
    }
  }
  changePage(pageChangeDirection: string) {
    this.changePageCustomPaginator.emit({ cambio: pageChangeDirection });
  }
  pageNumber() {
    return Math.ceil(this.lengthCustomPaginator / this.sizePageCustomPaginator);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface AuroraTableColumn {
  name: string;
  title?: string;
  render?: (value: any, row?: any) => string;
  statusClass?: (value: any, row?: any) => string;
}

export class AuroraActionColumn {
  imagen?: string;
  icon?: string | ((row: any) => string);
  disabled?: boolean | ((row: any) => boolean);
  iconClass?:
    | 'material-icons-rounded'
    | 'material-icons-outline'
    | 'material-icons-sharp' = 'material-icons-outline';
  iconColor?: string = '#138496';
  tooltip?: string;
  tooltipPosition?: 'left' | 'right' | 'above' | 'below' | 'before' | 'after' =
    'above';
  accion!: (row: any, router: Router) => any;
}
