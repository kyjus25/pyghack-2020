import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef, OnInit} from '@angular/core';

@Directive({
  selector: '[pavTemplate]',
  exportAs: 'pavTemplate',
})
export class PavTemplateDirective implements OnInit {
  @Input() set pavTemplate(value: string) {
    this.name = value;
  }
  private name: string;
  private template: TemplateRef<ElementRef>;
  constructor(
    public el: ElementRef,
    private templateRef: TemplateRef<ElementRef>,
    // private viewContainer: ViewContainerRef
  ) {
    this.template = this.templateRef;
  }

  public ngOnInit() {}

  public getName(): string {
    return this.name;
  }
  public getTemplate(): TemplateRef<ElementRef> {
    return this.template;
  }
}
