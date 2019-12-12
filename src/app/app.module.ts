import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { SearchNoteComponent } from './components/search-note/search-note.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteComponent } from './components/note/note.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNoteComponent,
    SearchNoteComponent,
    NoteListComponent,
    NoteComponent,
    EditNoteComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
