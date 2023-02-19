import { Component } from '@angular/core';
import { APP_NAME } from "../env";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../styles/navbar.component.scss']
})
export class NavbarComponent {
  appName: string = APP_NAME;
}
