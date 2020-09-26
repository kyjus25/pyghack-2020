import { Component, ViewChild, AfterViewInit } from '@angular/core';
import * as wordsImport from '../assets/data.json';
import * as blacklistImport from '../assets/blacklist.json';
import * as mapImport from '../assets/map.json';
import nlp from 'compromise';
import { CarouselComponent } from './carousel/carousel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  public sentence: string;
  public words: any = (wordsImport as any).default;
  public blacklist: any = (blacklistImport as any).default;
  public map: any = (mapImport as any).default;

  public activeIndex = 0;
  public matches = [];

  @ViewChild(CarouselComponent, { static: true }) carousel;

  public ngAfterViewInit() {
    console.log(this);
  }
  public onKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.submit();
    }
  }
  public submit(): void {
    this.activeIndex = 0;
    this.matches = [];

    const doc = nlp(this.sentence);
    doc.verbs().toInfinitive();
    const newSentence = doc.text().trim();
    if (!newSentence) return;
    const parts = newSentence.split(' ');

    const tempMatches = [];
    parts.forEach(word => {
      word = word.toLowerCase();
      if (!this.blacklist.includes(word)) {

        this.map.forEach(i => {
          if (i.input.includes(word)) {
            word = i.output;
          }
        });

        const firstLetter = word[0];

        const match = this.words[firstLetter].find(i => i.text.toLowerCase() === word);
        console.log(word, firstLetter, match);
        if (match) {
          match.localSrc = '/assets/videos/' + match.src.split('/')[4] + '/' + match.src.split('/')[5];
          match.localText = match.text.charAt(0).toUpperCase() + match.text.slice(1);
          tempMatches.push(match);
        } else {
          // try to find best match
          const bestMatch = this.words[firstLetter].filter(i => {
            const removeParens = i.text.toLowerCase().replace(/\(.*\)/, '').trim().replace('()', '');
            return removeParens === word;
          });
          if (bestMatch[0]) {
            bestMatch[0].localSrc = '/assets/videos/' + bestMatch[0].src.split('/')[4] + '/' + bestMatch[0].src.split('/')[5];
            bestMatch[0].localText = bestMatch[0].text.charAt(0).toUpperCase() + bestMatch[0].text.slice(1) + '*';
            tempMatches.push(bestMatch[0]);
          }
        }
      }
    });
    this.matches = tempMatches;
    const videos: any = document.querySelectorAll('.carousel');
    window.setTimeout(() => {
      this.carousel.onOrientation(true);
      console.log(videos, this.matches);
      this.playVideo(0);
    }, 0);
  }

  private playVideo(index): void {
    if (index < this.matches.length) {
      this.activeIndex = index;
      const videos: any = document.getElementsByClassName('video');
      if (videos) {
        // videos[this.activeIndex].addEventListener('ended', () => this.activeIndex = (this.activeIndex + 1) % this.matches.length);
        console.log(videos, this.matches);
        videos[index].play();
      }
    }
  }
}
