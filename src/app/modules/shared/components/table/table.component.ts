import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { isNotEmpty, isString } from 'class-validator';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import {
  cloneObject,
  toTitleCase,
} from '../../../../core/services/functions.service';

@Component({
  selector: 'aurora-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class AuroraTableComponent implements OnChanges, AfterViewInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  @ViewChild('table') table!: MatTable<any>;

  @Output() clickRow = new EventEmitter<any[]>();
  @Output() clickRefresh = new EventEmitter<any>();
  @Output() changePageCustomPaginator = new EventEmitter<any>();

  @Input() multipleSelection: boolean = false;
  @Input() pageSizeOptions: number[] = [10];

  @Input() columns: AuroraTableColumn[] = [];
  @Input() actions: AuroraActionColumn[] = [];
  @Input() data: any[] = [];
  @Input() actionColumnName: string = 'Acciones';
  @Input() valueSearch: string = '';
  @Input() filter: AuroraTableFilter[] = [];
  @Output() filteredData = new EventEmitter<any[]>();
  @Input() selectedItems: any[] = [];
  @Input() users: boolean = false;
  @Input() showPaginator: boolean = true;
  @Input() columnMaxLength: number = 70;

  displayedColumns: string[] = this.columns.map((value) => {
    return value.name;
  });

  dataSource = new MatTableDataSource<Set<any>>();
  selected = new Set<any>();
  expandedItems: any[] = [];

  isTableResponsive = false;

  constructor(
    private paginatorIntl: MatPaginatorIntl,
    private cdRef: ChangeDetectorRef
  ) {
    this.paginatorIntl.itemsPerPageLabel = 'Registros por página';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['valueSearch']) {
      this.applyFilter();
    }
    if (changes['data'] || changes['columns'] || changes['actions']) {
      this.setColumns();
      this.setData();
      this.dataSource.paginator = this.paginator;
    }
    if (changes['selectedItems']) {
      this.selected = new Set<any>(this.selectedItems);
      this.clickRow.emit(Array.from(this.selected));
    }

    if (changes['columnMaxLength']) {
      this.columnMaxLength =
        this.columnMaxLength > 0 ? this.columnMaxLength : 70;
    }
    this.cdRef.detectChanges();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.setTableResponsive();
    }, 1000);
  }

  setTableResponsive() {
    this.isTableResponsive = this.isTableMaxSize;
  }

  setFilter() {
    const data: any[] = JSON.parse(JSON.stringify(this.data));
    const filter = this.filter.map((val) => {
      return { [val.column]: val.value };
    });
    this.dataSource.data = data.filter((val) => {
      // .
    });
  }

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

  /**
   * Configura los datos de la tabla para que se pueda realizar filtros con los datos transformados
   */
  setData() {
    const newData = cloneObject(this.data);
    this.data.forEach((item, idx) => {
      for (const columnName in item) {
        const findColumn = this.columns.find(
          (column) => column.name == columnName
        );
        if (
          Object.prototype.hasOwnProperty.call(item, columnName) &&
          findColumn?.render
        ) {
          newData[idx][findColumn.name + 'Render'] = this.render(
            findColumn,
            item
          );
        }
      }
    });

    this.dataSource = new MatTableDataSource<any>(this.data);
  }

  applyFilter() {
    this.valueSearch = this.valueSearch
      ? this.valueSearch.trim().toLowerCase()
      : '';
    this.dataSource.filter = this.valueSearch;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.filteredData.emit(this.dataSource.filteredData);
  }

  selectItem(row: any) {
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

  expandItem(row: any, column: AuroraTableColumn) {
    const find = this.findExpandedItem(row, column);
    if (find) {
      this.expandedItems = this.expandedItems.filter((val) => {
        const nombreOFilaDiferentes =
          val.columnListName != find.columnListName || val.row != find.row;
        return nombreOFilaDiferentes;
      });
    } else {
      this.expandedItems.push({
        row: JSON.stringify(row),
        columnListName: column.name,
      });
    }
  }

  findExpandedItem(row: any, column: AuroraTableColumn) {
    const find = this.expandedItems.find(
      (val) =>
        val.columnListName == column.name && val.row == JSON.stringify(row)
    );
    return find;
  }

  hasExpandedItem(row: any, column: AuroraTableColumn) {
    return this.findExpandedItem(row, column) ? true : false;
  }

  render(column: AuroraTableColumn, item: any) {
    let element: any = {};
    let result: any = '';
    for (const field in item) {
      if (Object.prototype.hasOwnProperty.call(item, field)) {
        element[field] = item[field] ? item[field] : '';
      }
    }
    let value = element[column.name];
    if (column.render) {
      result = column.render(value, item);
    } else if (isString(value) || isNaN(Number(value))) {
      result = value;
    } else if (!isNaN(Number(value))) {
      result = Number(value);
      result = result == Infinity ? value + '' : result;
    } else {
      result = JSON.stringify(value);
    }
    result = result + ''; //Convertir en string
    result =
      result.length > this.columnMaxLength
        ? result.substring(0, this.columnMaxLength) + '...'
        : result;
    return result ? result : '';
  }

  getIcon(item: any, icon?: string | ((row: any) => string)) {
    const isIcon = isNotEmpty(icon) && isString(icon);
    const isFunction =
      isNotEmpty(icon) && typeof icon == 'function' ? icon(item) : 'check';
    return isIcon ? icon : isFunction;
  }

  getImagen(item: any, imagen?: string | ((row: any) => string)) {
    const isImagen = isNotEmpty(imagen) && isString(imagen);
    const isFunction =
      isNotEmpty(imagen) && typeof imagen == 'function' ? imagen(item) : '';
    return isImagen ? imagen : isFunction;
  }

  getText(item: any, text?: string | ((row: any) => string)) {
    const isText = isNotEmpty(text) && isString(text);
    const isFunction =
      isNotEmpty(text) && typeof text == 'function' ? text(item) : '';
    return isText ? text : isFunction;
  }

  isDisabledAction(action: AuroraActionColumn, row: any) {
    if (typeof action.disabled == 'function') {
      return action.disabled(row);
    } else {
      return action.disabled ? true : false;
    }
  }

  getButtonClass(item: any, buttonClass?: string | ((row: any) => string)) {
    const isClass = isNotEmpty(buttonClass) && isString(buttonClass);
    const isFunction =
      isNotEmpty(buttonClass) && typeof buttonClass == 'function'
        ? buttonClass(item)
        : 'btn-outline-secondary';
    return isClass ? buttonClass : isFunction;
  }

  get isTableMaxSize() {
    const tableElement = this.table['_elementRef'].nativeElement;
    const tableContainer: HTMLDivElement = this.tableContainer.nativeElement;

    const elementWidth = tableElement.clientWidth;
    const maxWidth = tableContainer.clientWidth;

    return elementWidth > maxWidth;
  }

  hasLeftItems(column: AuroraTableColumn) {
    return (
      column.statusClass || column.hasFlag || column.hasCheck || column.itemList
    );
  }

  hasCheck(column: AuroraTableColumn, item: any) {
    return typeof column.hasCheck == 'function'
      ? column.hasCheck(item[column.name], item)
      : column.hasCheck;
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
  columnClass?: (value: any, row?: any) => string;
  titleClass?: string;
  statusClass?: (value: any, row?: any) => string;
  hasFlag?: (value: any, row?: any) => boolean;
  hasCheck?: ((value?: any, row?: any) => boolean) | boolean;
  itemList?: (row?: any) => AuroraTableColumnList[];
  titleAlignment?: 'text-start' | 'text-end' | 'text-center';
  contentAlignment?: 'text-start' | 'text-end' | 'text-center';
}

export interface AuroraTableColumnList {
  icon: string;
  iconClass?: string;
  text: string;
  textClass?: string;
  action?: AuroraTableColumnListItemAction;
  tooltip?: string;
}

export class AuroraTableColumnListItemAction {
  icon?: string;
  disabled?: boolean;
  iconClass?: string;
  accion!: (row: any) => any;
}
export class AuroraActionColumn {
  imagen?: string | ((row: any) => string);
  texto?: string | ((row: any) => string);
  icon?: string | ((row: any) => string);
  disabled?: boolean | ((row: any) => boolean);
  iconClass?:
    | 'material-icons-rounded'
    | 'material-icons-outline'
    | 'material-icons-sharp' = 'material-icons-outline';
  buttonClass?: string | ((row: any) => string);
  iconColor?: string = '#138496';
  tooltipText?: string;
  tooltipOrientation?: 'above' | 'below' | 'left' | 'right' = 'below';
  accion!: (row: any) => any;
}
export interface AuroraTableFilter {
  column: string;
  value: string;
}
