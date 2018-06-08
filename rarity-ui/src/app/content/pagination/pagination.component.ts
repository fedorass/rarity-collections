import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'grid-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  host: {
    'class': 'row'
  }
})
export class PaginationComponent implements OnInit {

  @Input()
  pageNumber: number;

  @Input()
  totalPages: number;

  @Input()
  hasMore: boolean;

  @Output() onPageNumberChanged = new EventEmitter<number>();

  constructor() {
    this.pageNumber = 0;
    this.totalPages = 0;
    this.hasMore = false;
   }

  ngOnInit() {
  }

  isFirst(): boolean {
    return this.totalPages === 0 || this.pageNumber === 0;
  }

  hasNext(): boolean {
    return this.pageNumber < (this.totalPages - 1) || this.hasMore;
  }

  hasPrevious(): boolean {
    return this.pageNumber > 0;
  }

  getPageNumbers(): any[] {
    return Array(this.totalPages);
  }

  pageNumberChanged(n : number): void {
    this.onPageNumberChanged.emit(n);
  }
 
}
