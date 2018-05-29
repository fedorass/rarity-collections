import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'grid-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  host: {
    'class': 'col-md-6 col-lg-12 mb-1'
  }
})
export class FilterComponent implements OnInit {

  @Input() label: string;
  @Input() name: string;
  @Input() values: Array<any>;
  @Input() default: boolean;

  @Output() onFilterChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.default = true;
  }

  onFilterChange(filter?: any) {
    if (filter) {
      this.onFilterChanged.emit(filter.label);
    }
    else {
      this.onFilterChanged.emit();
    }
  }

}
