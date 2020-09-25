import {
  Component, AfterContentInit, ContentChildren, QueryList} from '@angular/core';
import {PavTemplateDirective} from './template.directive';


@Component({
  selector: 'app-template',
  template: ''
})
export class TemplateComponent implements AfterContentInit {
  @ContentChildren(PavTemplateDirective) templates: QueryList<PavTemplateDirective>;
  protected POSTFIX: string = 'Template';

  constructor () {}

  public ngAfterContentInit(): void {
    this.templates.forEach(template => {
      const name = template.getName() + this.POSTFIX;
      this[name] = template.getTemplate();
    });
  }

  public getTemplate(input: string) {
    return this[input + this.POSTFIX];
  }
}
