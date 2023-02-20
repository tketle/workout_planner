import { Component } from '@angular/core';
import {ContentComponent} from "../content-component";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['../../../styles/schedule.component.scss']
})
export class ScheduleComponent implements ContentComponent {
  name = 'Schedule';
}
