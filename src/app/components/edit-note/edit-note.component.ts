import { INote } from './../../models/note';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { EditNoteService } from './edit-note.service';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit, OnDestroy {
  constructor(private service: EditNoteService) {}

  private subscribtions: Subscription = new Subscription();
  @Input() note: INote;
  @Output() closeEdit = new EventEmitter();
  @Output() edit = new EventEmitter<INote>();

  public input: FormControl = new FormControl();

  ngOnInit() {
    this.input.setValue(this.note.text);
    this.subscribtions.add(
      this.input.valueChanges
        .pipe(
          map(value => {
            this.note.text = value;
            return value;
          }),
          debounceTime(1000),
          distinctUntilChanged()
        )
        .subscribe(value => {
          this.edit.emit({
            id: this.note.id,
            text: value
          });
        })
    );
  }

  ngOnDestroy(): void {
    this.subscribtions.unsubscribe();
  }
}
