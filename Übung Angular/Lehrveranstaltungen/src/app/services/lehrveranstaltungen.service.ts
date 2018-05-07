import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LehrveranstaltungenService {

  ListOfLVs: Lehrveranstaltung[] = [];
  private LVSubject = new BehaviorSubject<Lehrveranstaltung[]>(this.ListOfLVs);

  ListOfLVs$ = this.LVSubject.asObservable();

  nextid = 0;

  constructor() {
    this.add({
        fullname: 'Angewandte Mathematik 2',
        abbreviation: 'MATU',
        lector: 'Susanne Teschl',
        ects: 3,
        exam: '20.6.2018',
        moodle: '6048',
        id: 0
      });
    this.add({
        fullname: 'Business Communication for Engineers',
        abbreviation: 'BCO',
        lector: 'Patrizia Spella',
        ects: 1.5,
        exam: '-',
        moodle: '5567',
        id: 0
      });
    this.add({
        fullname: 'Datensicherheit 2',
        abbreviation: 'DASU',
        lector: 'Alexander Mense',
        ects: 1.5,
        exam: '29.04.2018',
        moodle: '4462',
        id: 0
      });
  }

  public add(LV: Lehrveranstaltung) {
    LV.id = ++this.nextid;
    const newLVs = [LV, ...this.ListOfLVs];
    this.ListOfLVs = newLVs;
    this.LVSubject.next(newLVs);
  }

  public remove(id: number) {
    const newLVs = this.ListOfLVs.filter(lv => lv.id !== id);
    this.ListOfLVs = newLVs;
    this.LVSubject.next(newLVs);
  }

  public find(id: number): Lehrveranstaltung {
    return this.ListOfLVs.find(lv => lv.id === id);
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
