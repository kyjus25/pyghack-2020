import {Component, OnInit, OnDestroy} from '@angular/core';
import {TemplateComponent} from '../template';

@Component({
  providers: [],
  selector: 'pm-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent extends TemplateComponent implements OnInit, OnDestroy {
  public ngOnInit() {}
  public ngOnDestroy() {}
}
