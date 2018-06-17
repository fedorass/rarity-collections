import { Component, OnChanges, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'grid-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  host: {
    'class': 'col-md-6 col-lg-12 mb-1'
  }
})
export class FilterComponent implements OnInit, OnChanges {

  @Input() label: string;
  @Input() name: string;
  @Input() values: Array<any>;

  selected: string;

  @Output() onFilterChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.selected = '';
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selected = '';
  }

  onFilterChange() {
    if (this.selected) {
      this.onFilterChanged.emit(this.selected);
    }
    else {
      this.onFilterChanged.emit();
    }
  }

}
