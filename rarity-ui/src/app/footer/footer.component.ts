import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  host: {
    'class': 'row w-100'
  }
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
