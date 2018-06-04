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

  @Output() onPageNumberChanged = new EventEmitter<number>();

  constructor() {
    this.pageNumber = 1;
    this.totalPages = 0;
   }

  ngOnInit() {
  }

  isFirst(): boolean {
    return this.totalPages === 0 || this.pageNumber === 1;
  }

  isLast(): boolean {
    return this.totalPages === 0 || this.pageNumber === this.totalPages;
  }

  hasNext(): boolean {
    return this.pageNumber < this.totalPages;
  }

  hasPrevious(): boolean {
    return this.pageNumber > 1;
  }

  getPageNumbers(): any[] {
    return Array(this.totalPages);
  }

  pageNumberChanged(n : number): void {
    this.onPageNumberChanged.emit(n);
  }
 
}
