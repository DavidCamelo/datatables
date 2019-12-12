import { Component, OnInit, OnDestroy, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { MdbTableDirective, MdbTablePaginationComponent, MdbTableSortDirective } from 'angular-bootstrap-md';
import { Router } from '@angular/router';

import { CarService } from 'src/app/service/car.service';
import { Observable } from 'rxjs';
import { ColumnModel } from 'src/app/model/column.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  @ViewChild(MdbTableSortDirective, { static: true }) mdbTableSort: MdbTableSortDirective;

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;

  @Input() modelUrl: string;

  @Input() elemetType: any;

  @Output() selectRowEmit: EventEmitter<any>;

  @Output() elementsChangeEmit: EventEmitter<any>;

  private eventRefreshTableSubscription;

  @Input() eventRefreshTable: Observable<void>;

  elements: any[] = [];

  previous: any[] = [];

  searchText = '';

  page = 1;

  @Input() limit = 10;

  orderBy = 'id';

  direction = 'ASC';

  columnsNames: ColumnModel[];

  columns: string[];

  columnsPagination: number;

  constructor( private carService: CarService, private router: Router ) {
    this.selectRowEmit = new EventEmitter();
    this.elementsChangeEmit = new EventEmitter();
  }

  ngOnInit() {
    if (this.eventRefreshTable) {
      this.eventRefreshTableSubscription = this.eventRefreshTable.subscribe((modelUrlAndElemetType: any) => {
        if (modelUrlAndElemetType) {
          this.modelUrl = modelUrlAndElemetType.modelUrl;
          this.elemetType = modelUrlAndElemetType.elemetType;
        }
        this.loadTable();
      });
    }
    this.loadTable();
    this.mdbTablePagination.paginationChange().subscribe((data: any) => {
      let page = data.last - data.first;
      if (page < this.limit && page > 0) {
        page = Math.ceil(data.last / this.limit);
        if (this.page !== page) {
          this.page = Math.ceil(data.last / this.limit);
          this.loadTable();
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.eventRefreshTableSubscription) {
      this.eventRefreshTableSubscription.unsubscribe();
    }
  }

  @HostListener('input')
  oninput() {
    this.mdbTablePagination.searchText = this.searchText;
  }

  sorted( event: any ) {
    this.orderBy = event.sortBy;
    if (this.direction === 'ASC') {
      this.direction = 'DESC';
      this.loadTable();
    } else if (this.direction === 'DESC') {
      this.direction = 'ASC';
      this.loadTable();
    }
  }

  loadTable() {
    if (this.modelUrl) {
      this.carService.getAll(this.modelUrl, this.page, this.limit, this.direction, this.orderBy, this.searchText).subscribe(
        (response: any) => {
          this.elements = [];
          for (const element of response.content) {
            this.elements.push(element);
          }
          if (this.elements[0]) {
            this.selectRow(this.elements[0]);
          }
          this.elementsChangeEmit.emit(this.elements);
          if (this.elements.length < response.totalElements) {
            const blankElements = response.totalElements - this.limit;
            const totalFordwardElements = blankElements - ((this.page - 1) * this.limit);
            const totalBackwardElements = blankElements - totalFordwardElements;
            for (let i = 0; i < totalFordwardElements; i ++) {
              this.elements.push(this.elemetType);
            }
            for (let i = 0; i < totalBackwardElements; i ++) {
              this.elements.splice(0, 0, this.elemetType);
            }
          }
          this.mdbTable.setDataSource(this.elements);
          this.elements = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
          this.emitDataSourceChange();
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  emitDataSourceChange() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(this.limit);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.getColumnsName();
  }

  searchItems() {
    this.loadTable();
  }

  selectRow( element: any ) {
    for (const ele of this.elements) {
      ele.isSelected = false;
    }
    element.isSelected = true;
    this.selectRowEmit.emit(element);
  }

  getColumnsName() {
    this.columnsNames = [];
    this.columns = [];
    Object.entries(this.elemetType).forEach(([key]) => {
      if (key !== 'isSelected') {
        const columnName = new ColumnModel();
        columnName.sortBy = key;
        columnName.name = key;
        this.columnsNames.push(columnName);
        this.columns.push(key);
      }
    });
    this.columnsPagination = this.columns.length;
  }

}
