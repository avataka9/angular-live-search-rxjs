import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { INote } from '@/models/note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  constructor() {}

  @Input() colorized: boolean;
  @Input() filtered: boolean;
  @Input() notes$: Observable<INote[]>;
  @Input() title: string;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<INote>();

  notesTrackFn = (i, note) => note.id;

  ngOnInit() {}
}
