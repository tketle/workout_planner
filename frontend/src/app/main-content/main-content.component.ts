import {Component, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {ContentComponent} from "./content-component";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['../../styles/main-content.component.scss']
})
export class MainContentComponent {
  @ViewChild('content', {read: ViewContainerRef}) content!: ViewContainerRef;

  renderView(content: Type<ContentComponent>): void {
    this.content.clear();
    this.content.createComponent<ContentComponent>(content);
  }
}
