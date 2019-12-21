import { environment } from './../../environments/environment';
import { INote } from './../models/note';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // tslint:disable-next-line: variable-name
  private readonly _notesSubject = new BehaviorSubject<INote[]>([]);
  public notes$ = this._notesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.http
      .get<INote[]>(`${environment.apiUrl}/notes`)
      .subscribe(notes => (this.notes = notes));
  }

  private get notes(): INote[] {
    return this._notesSubject.getValue();
  }

  private set notes(notes: INote[]) {
    this._notesSubject.next(notes);
  }

  public addNote(text: string): void {
    if (!text || !text.trim().length) {
      return;
    }

    const tmpId = new Date().toISOString();
    const tmpNote = {
      id: tmpId,
      text
    };

    this.notes = [...this.notes, tmpNote];

    this.http.post<INote>(`${environment.apiUrl}/notes`, tmpNote).subscribe(
      note => {
        const indx = this.notes.indexOf(this.notes.find(n => n.id === tmpId));
        this.notes[indx] = {
          ...note
        };
        this.notes = [...this.notes];
        console.log('success added');
      },
      err => {
        console.error(err);
        this.removeNote(tmpId, false);
      }
    );
  }

  public removeNote(id: string, serverRemove = true): void {
    const tmpNote = this.notes.find(n => n.id === id);
    this.notes = this.notes.filter(note => note.id !== id);

    if (serverRemove) {
      this.http.delete(`${environment.apiUrl}/notes/${id}`).subscribe(
        response => {
          console.log('delete success');
        },
        error => {
          console.log(error);
          this.notes = [...this.notes, tmpNote];
        }
      );
    }
  }

  public editNote(text: string, id: string): void {
    const tmpNote = this.notes.find(note => note.id === id);
    if (!tmpNote) {
      return;
    }

    const index = this.notes.indexOf(tmpNote);
    this.notes[index] = {
      ...tmpNote,
      text
    };
    this.notes = [...this.notes];

    const body = {
      text
    };

    this.http.put(`${environment.apiUrl}/notes/${id}`, body).subscribe(
      response => {
        console.log('edit success');
        console.log(response);
      },
      error => {
        console.log(error);
        this.notes[index] = {
          ...tmpNote
        };
        this.notes = [...this.notes];
      }
    );
  }
}
