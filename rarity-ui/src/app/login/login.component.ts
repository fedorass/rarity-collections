import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    'class': 'row d-flex flex-grow'
  }
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
