import {Component, Type, ViewChild} from '@angular/core';
import {ContentComponent} from "./content-component";
import {ContentDirective} from "./content-directive";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['../../styles/main-content.component.scss']
})
export class MainContentComponent {
  @ViewChild(ContentDirective, {static: true}) content!: ContentDirective;

  renderView(content: Type<ContentComponent>): void {
    this.content.viewContainerRef.clear();
    this.content.viewContainerRef.createComponent<ContentComponent>(content);
  }
}
