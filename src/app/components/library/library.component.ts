import { Component, OnInit } from '@angular/core';
import { faBookOpen, faTimes } from '@fortawesome/free-solid-svg-icons';

// @ts-ignore
import libraryEntries from './library.json';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  bookOpen = faBookOpen;
  times = faTimes;
  entries = libraryEntries.entries.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
  filteredEntries: any;
  activeKey = this.entries[0];
  toggled = false;

  constructor() {
    this.filteredEntries = this.entries;
  }

  ngOnInit() {
  }

  inputChange(input) {
    this.filteredEntries = [];
    this.entries.forEach(entry => {
      entry.search_terms.forEach(searchTerm => {
        if (searchTerm.includes(input.toLowerCase()) && !this.filteredEntries.includes(entry)) {
          this.filteredEntries.push(entry);
        }
      });
    });
  }

  toggle() {
    this.toggled = !this.toggled;
  }
}
