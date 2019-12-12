import { StoreService } from '@/services/store.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { INote } from '@/models/note';
import { isNull } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private store: StoreService) {}

  // tslint:disable-next-line: variable-name
  private _searchString = '';
  public get searchString(): string {
    return this._searchString;
  }
  public set searchString(value: string) {
    this._searchString = value.trim();
    this.setSearchArray(value);
    this.updateStreams();
  }

  // tslint:disable-next-line: variable-name
  private _searchType = '';
  // tslint:disable-next-line: variable-name
  private _isSearchTypeEntries = false;
  public get searchType(): string {
    return this._searchType;
  }
  public set searchType(type: string) {
    this._searchType = type;
    this.updateStreams();
    this._isSearchTypeEntries = type === 'entrys' ? true : false;
  }

  public filtered$: Observable<INote[]> = from([]);
  public remaining$: Observable<INote[]> = this.store.notes$;

  public searchArray: string[] = [];
  private setSearchArray(searchString: string = '') {
    const tmpSet = new Set(this.getSplitedArray(searchString));
    tmpSet.delete('');
    this.searchArray = Array.from(tmpSet);
  }

  private getSourceSet(source: string = ''): Set<string> {
    return new Set(this.getSplitedArray(source));
  }

  private getSplitedArray(text: string = '') {
    return text.split(
      // tslint:disable-next-line: max-line-length
      /[(\s+|\,+|\.+|\\+|\/+|\t+|\n+|\r+|\!+|\#+|\$+|\&+|\'+|\"+|\`+|\(+|\)+|\*+|\++|\:+|\;+|\<+|\>+|\=+|\?+|\@+|\[+|\]+|\^+|\_+|\{+|\|+|\}+|\~+)]/g
    );
  }

  private isContain(sourceStr): boolean {
    const sourceSet = this.getSourceSet(sourceStr);
    return this.searchArray.some(
      srchStr =>
        sourceSet.has(srchStr) ||
        (this._isSearchTypeEntries && sourceStr.search(srchStr) >= 0)
    );
  }

  private updateStreams() {
    this.filtered$ =
      this._searchString !== ''
        ? this.store.notes$.pipe(
            map(notelist => notelist.filter(note => this.isContain(note.text)))
          )
        : from([]);
    this.remaining$ =
      this._searchString !== ''
        ? this.store.notes$.pipe(
            map(notelist => notelist.filter(note => !this.isContain(note.text)))
          )
        : this.store.notes$;
  }
}
