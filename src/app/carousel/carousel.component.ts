import {Component, OnInit, OnDestroy, AfterContentInit, Input, ViewChild, AfterViewInit} from '@angular/core';
// import {CardComponent} from '../card';
import {TemplateComponent} from '../template'

@Component({
  providers: [],
  selector: 'pm-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent extends TemplateComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {
  @ViewChild('carousel', {static: true}) carousel;
  @Input() isHorizontal: boolean = true;
  @Input() set index(value){
    this.rotateCarousel(value);
  }

  private theta: number = 360;
  private radius: number = 0;
  private rotateFn: string;
  public debug: boolean = false;
  public testCells: number[] = [];
  public _index: number = 0;

  public ngOnInit() {
  }
  public ngOnDestroy() {}

  public ngAfterContentInit() {}

  public ngAfterViewInit() {
    this.onOrientation(this.isHorizontal);
  }

  public rotateCarousel(index: number) {
    this._index = index;
    let angle = this.theta * this._index * -1;
    this.carousel.nativeElement.style.transform = 'translateZ(' + -this.radius + 'px) ' +
      this.rotateFn + '(' + angle + 'deg)';
  }

  public changeCarousel() {
    const cells = document.getElementsByClassName('carousel__cell');
    const cellSize = this.isHorizontal ? this.carousel.nativeElement.offsetWidth : this.carousel.nativeElement.offsetHeight;
    this.radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cells.length ) );
    this.theta = 360 / cells.length;

    for ( var i=0; i < cells.length; i++ ) {
      const cell: any = cells[i];
      if ( i < cells.length ) {
        // visible cell
        cell.style.opacity = 1;
        const cellAngle = this.theta * i;
        cell.style.transform = this.rotateFn + '(' + cellAngle + 'deg) translateZ(' + this.radius + 'px)';
      } else {
        // hidden cell
        cell.style.opacity = 0;
        cell.style.transform = 'none';
      }

    }
    this.rotateCarousel(this._index);
  }

  public onOrientation(isHorizontal: boolean) {
    this.isHorizontal = isHorizontal;
    this.rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
    this.changeCarousel();
  }

  public onCellsChange(event: number) {
    this.testCells = [];
    for ( var i=0; i < event; i++ ) {
      this.testCells.push(i);
    }

    setTimeout(() =>{
      this.changeCarousel();
    }, 0);
  }
}


/*
code example came from https://codepen.io/desandro/pen/wjeBpp
*/
