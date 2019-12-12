import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AddNoteService } from './add-note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {
  constructor(public service: AddNoteService) {}

  @Output() addNote = new EventEmitter<string>();

  ngOnInit() {}
}
