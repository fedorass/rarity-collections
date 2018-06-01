import { Component } from '@angular/core';

@Component({
  selector: 'ui-collection',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    'class': 'container-fluid d-flex flex-column flex-grow'
  }
})
export class AppComponent {

}
