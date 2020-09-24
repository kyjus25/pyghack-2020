declare var require: any;
import { Component } from '@angular/core';
import * as wordsImport from  '../assets/data.json';
import * as blacklistImport from  '../assets/blacklist.json';
import * as mapImport from  '../assets/map.json';
import {first} from 'rxjs/operators';
const verbutils = require('verbutils')();
import nlp from 'compromise';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public sentence: string;
  public activeVideo: string;
  public words: any = (wordsImport as any).default;
  public blacklist: any = (blacklistImport as any).default;
  public map: any = (mapImport as any).default;

  public submit(): void {

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
        this.activeVideo = match.src;
        this.playVideo();
      }
    });
  }

  private playVideo() {
    const video = document.getElementById('video');
    const source = document.createElement('source');
    video.pause();
    source.setAttribute('src', this.activeVideo);
    video.appendChild(source);
    video.load();
    video.play();
  }
}
