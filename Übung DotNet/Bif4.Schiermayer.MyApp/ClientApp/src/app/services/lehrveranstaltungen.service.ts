import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BASE_URL } from '../baseUrl';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, repeatWhen, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LehrveranstaltungenService {
  private refreshSubject = new Subject<any>();

  nextid = 0;

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) { }

  public get ListOfLVs$() {
    const result =
      this.http
      .get<Lehrveranstaltung[]>(`${this.baseUrl}api/lv`)
      .pipe(
      repeatWhen(foo => this.refreshSubject.asObservable())
      );
    return result;
  }

  public add(LV: Lehrveranstaltung) {
    return this.http.put(`${this.baseUrl}api/lv`, LV)
      .pipe(
      tap(item => this.refreshSubject.next(item))
      );
  }

  public remove(id: number) {
    const result = this.http.delete(`${this.baseUrl}api/lv/` + id)
      .pipe(
      tap(item => this.refreshSubject.next(item))
      ).subscribe();

    return result;
  }

  public find(id: number) {
    const result =
      this.http
        .get<Lehrveranstaltung>(`${this.baseUrl}api/lv/` + id)
        .pipe(
        repeatWhen(foo => this.refreshSubject.asObservable())
        );
    return result;
  }
}

export class Lehrveranstaltung {
  fullname: string;
  abbreviation: string;
  lector: string;
  ects: number;
  exam: string;
  moodle: string;
  id: number;
}
