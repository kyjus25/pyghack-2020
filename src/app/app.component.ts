declare var require: any;
import { Component, ViewChild } from '@angular/core';
import * as wordsImport from '../assets/data.json';
import * as blacklistImport from '../assets/blacklist.json';
import * as mapImport from '../assets/map.json';
import { first } from 'rxjs/operators';
// const verbutils = require('verbutils')();
import nlp from 'compromise';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public sentence: string;
  public words: any = (wordsImport as any).default;
  public blacklist: any = (blacklistImport as any).default;
  public map: any = (mapImport as any).default;

  public activeIndex = 0;
  public matches;
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '60px',
    dots: true,
    arrows: true,
    focusOnSelect: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1,
        },
      },
    ],
  };
  @ViewChild('slickModal', { static: true }) slickModal: SlickCarouselComponent;

  public _trackBy(match): any {
    return match.text;
  }
  public slickInit(e: any): void {
    console.log('slick initialized');
    this.playVideo();
  }

  public breakpoint(e: any): void {
    console.log('breakpoint');
  }

  public afterChange(e: any): void {
    this.playVideo();
    const slides = document.querySelectorAll('div[id^="slick-slide"]');
    console.log(slides);
    console.log(this.matches);
  }

  public beforeChange(e: any): void {
    // console.log('beforeChange', e);
  }

  public submit(): void {
    this.activeIndex = 0;
    this.matches = [];

    const doc = nlp(this.sentence);
    doc.verbs().toInfinitive();
    const newSentence = doc.text();
    const parts = newSentence.split(' ');

    parts.forEach((word) => {
      word = word.toLowerCase();
      if (!this.blacklist.includes(word)) {
        this.map.forEach((i) => {
          if (i.input.includes(word)) {
            word = i.output;
          }
        });

        const firstLetter = word[0];

        const match = this.words[firstLetter].find(
          (i) => i.text.toLowerCase() === word
        );
        console.log(word, firstLetter, match);
        if (match) {
          // console.log(match.src.split('/'));
          match.localSrc =
            '/assets/videos/' +
            match.src.split('/')[4] +
            '/' +
            match.src.split('/')[5];
          this.matches.push(match);
        }
      }
    });
    // const slides = document.querySelectorAll('div[id^="slick-slide"]');
    // console.log(slides);
    // Array.from(slides).forEach((e) => {
    //   console.log(e)
    //   e.remove();
    // });
    // console.log(slides);
    // this.slickModal.slickGoTo(0);
  }

  private playVideo(): void {
    const activeSlide = document.getElementsByClassName('slick-active')[0];
    const activeVideo = activeSlide.querySelector('video');
    if (activeVideo) {
      activeVideo.addEventListener('ended', () => this.slickModal.slickNext());
      activeVideo.play();
    }
  }
}
