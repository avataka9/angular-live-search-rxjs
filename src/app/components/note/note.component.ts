import { AppService } from './../../services/app.service';
import { INote } from './../../models/note';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NoteService } from './note.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  public get colorizedHtml() {
    if (this.filtered && this.colorized) {
      const tmpStr = this.note.text;

      function reducer(total, srchStr) {
        const regexp = new RegExp(`${srchStr}`, 'gi');
        return total.replace(
          regexp,
          `<div style="display:inline;background:yellow;">${srchStr}</div>`
        );
      }
      return this.DomSanitazer.bypassSecurityTrustHtml(
        this.appService.searchArray.reduce(reducer, tmpStr)
      );
    }
  }

  constructor(
    private service: NoteService,
    private appService: AppService,
    private DomSanitazer: DomSanitizer
  ) {}

  @Input() colorized: boolean;
  @Input() filtered: boolean;
  @Input() note: INote;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<INote>();

  ngOnInit() {}
}
