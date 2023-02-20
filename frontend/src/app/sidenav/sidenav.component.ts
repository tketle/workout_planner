import {MainContentComponent} from "../main-content/main-content.component";
import {AfterViewInit, Component, Type, ViewChild} from "@angular/core";
import {ExercisesComponent} from "../main-content/exercises/exercises.component";
import {ContentComponent} from "../main-content/content-component";
import {ScheduleComponent} from "../main-content/schedule/schedule.component";

export interface NavItem {
  name: string;
  component: Type<ContentComponent>;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['../../styles/sidenav.component.scss']
})
export class SidenavComponent implements AfterViewInit {
  navItems: NavItem[] = [
    {name: 'Exercises', component: ExercisesComponent},
    {name: 'Schedule', component: ScheduleComponent}
  ];
  selectedNavItem: NavItem = this.navItems[0];

  @ViewChild(MainContentComponent) content!: MainContentComponent;

  navItemSelected(navItem: NavItem): void {
    if (this.selectedNavItem !== navItem) {
      this.selectedNavItem = navItem;
      this.content.renderView((navItem.component));
    }
  }

  ngAfterViewInit() {
    this.content.renderView(this.selectedNavItem.component);
  }
}
