import { Component } from '@angular/core';
import * as wordsImport from  '../assets/data.json';
import * as blacklistImport from  '../assets/blacklist.json';
import * as mapImport from  '../assets/map.json';
import nlp from 'compromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public sentence: string;
  public words: any = (wordsImport as any).default;
  public blacklist: any = (blacklistImport as any).default;
  public map: any = (mapImport as any).default;

  public activeIndex = 0;
  public matches;

  public submit(): void {
    this.activeIndex = 0;
    this.matches = [];

    const doc = nlp(this.sentence);
    doc.verbs().toInfinitive();
    const newSentence = doc.text();
    const parts = newSentence.split(' ');

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
          match.localText = match.text;
          this.matches.push(match);
        } else {
          // try to find best match
          const bestMatch = this.words[firstLetter].filter(i => {
            const removeParens = i.text.toLowerCase().replace(/\(.*\)/, '').trim().replace('()', '');
            return removeParens === word;
          });
          if (bestMatch[0]) {
            bestMatch[0].localSrc = '/assets/videos/' + bestMatch[0].src.split('/')[4] + '/' + bestMatch[0].src.split('/')[5];
            bestMatch[0].localText = bestMatch[0].text + '*';
            this.matches.push(bestMatch[0]);
          }
        }
      }
    });
  }

  private playVideo() {
    // const video = document.getElementById('video');
    // const source = document.createElement('source');
    // video.pause();
    // source.setAttribute('src', this.activeVideo);
    // video.appendChild(source);
    // video.load();
    // video.play();
  }
}
