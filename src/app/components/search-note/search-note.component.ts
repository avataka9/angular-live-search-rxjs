import { isNull } from 'util';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { SearchNoteService } from './search-note.service';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { FormControl, NgModel } from '@angular/forms';

@Component({
  selector: 'app-search-note',
  templateUrl: './search-note.component.html',
  styleUrls: ['./search-note.component.scss']
})
export class SearchNoteComponent implements OnInit, OnDestroy {
  private subscribtions: Subscription = new Subscription();
  public type = 'words';
  private typeSubject = new BehaviorSubject(this.type);

  constructor(private service: SearchNoteService) {
    this.subscribtions.add(
      this.typeSubject
        .asObservable()
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe(value => (isNull(value) ? '' : this.searchType.emit(value)))
    );
  }

  @Output() search = new EventEmitter<string>();
  @Output() searchType = new EventEmitter<string>();
  @Output() colorized = new EventEmitter<boolean>();
  public input: FormControl = new FormControl();
  public colorize: FormControl = new FormControl();

  public clearInput() {
    this.input.reset();
  }

  public radioClicked() {
    this.typeSubject.next(this.type);
  }

  ngOnInit() {
    this.subscribtions.add(
      this.input.valueChanges
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe(value => {
          this.search.emit(value);
        })
    );
    this.subscribtions.add(
      this.colorize.valueChanges
        .pipe(debounceTime(1000), distinctUntilChanged())
        .subscribe(value => {
          this.colorized.emit(value);
        })
    );
  }
  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }
}
