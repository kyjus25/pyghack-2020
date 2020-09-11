import { Component } from '@angular/core';
import * as wordsImport from  '../assets/data.json';
import * as blacklistImport from  '../assets/blacklist.json';
import * as mapImport from  '../assets/map.json';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public sentence: string;

  public submit(): void {
    const words: any = (wordsImport as any).default;
    const blacklist: any = (blacklistImport as any).default;
    const map: any = (mapImport as any).default;

    const parts = this.sentence.split(' ');
    parts.forEach(word => {
      word = word.toLowerCase();
      if (!blacklist.includes(word)) {
        const lastLetters = word.slice(-2);

        if (lastLetters === 'ed') {
          word = word.slice(0, -2);
        }

        map.forEach(i => {
          if (i.input.includes(word)) {
            word = i.output;
          }
        });

        const firstLetter = word[0];

        console.log(words, firstLetter);

        const match = words[firstLetter].find(i => i.text.toLowerCase() === word);
        console.log(word, match);
      }
    });
    // console.log(words);
  }
}
