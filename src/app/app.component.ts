import { isNull } from 'util';
import { AppService } from './services/app.service';
import { INote } from './models/note';
import { Component } from '@angular/core';
import { StoreService } from '@/services/store.service';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isEdit = false;
  public editableNote: INote;
  public colorized = false;

  constructor(public store: StoreService, public service: AppService) {}

  addNote(note) {
    this.store.addNote(note);
  }

  onSearch(text) {
    if (isNull(text)) {
      this.service.searchString = '';
    } else {
      this.service.searchString = text;
    }
  }

  onSearchType(type) {
    this.service.searchType = type;
  }
}
