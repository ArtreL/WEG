import { TestBed, inject } from '@angular/core/testing';
import { skip, take } from 'rxjs/operators';
import { VirtualTimeScheduler } from 'rxjs/scheduler/VirtualTimeScheduler';

import { LehrveranstaltungenService, Lehrveranstaltung } from './lehrveranstaltungen.service';

describe('LehrveranstaltungenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LehrveranstaltungenService]
    });
  });

  it('should be created', inject([LehrveranstaltungenService], (service: LehrveranstaltungenService) => {
    expect(service).toBeTruthy();
  }));

  it('observable should return array with new element', inject([LehrveranstaltungenService], (service: LehrveranstaltungenService) => {
    const newItem: Lehrveranstaltung = {
        fullname: 'Angewandte Mathematik 2',
        abbreviation: 'MATU',
        lector: 'Susanne Teschl',
        ects: 3,
        exam: '20.6.2018',
        moodle: '6048',
        id: 0
      };

    service.ListOfLVs$
      .pipe(skip(1))
      .subscribe(LVs => {
        expect(LVs.length).toBeGreaterThanOrEqual(1);
        expect(LVs).toContain(newItem);
      });

    service.add(newItem);
  }));

  it('items should be added with different ids', inject([LehrveranstaltungenService], (service: LehrveranstaltungenService) => {
    const newItem: Lehrveranstaltung = {
      fullname: 'Angewandte Mathematik 2',
      abbreviation: 'MATU',
      lector: 'Susanne Teschl',
      ects: 3,
      exam: '20.6.2018',
      moodle: '6048',
      id: 0
    };

    service.add(Object.assign({}, newItem));
    service.add(Object.assign({}, newItem));
    service.add(Object.assign({}, newItem));
    service.add(Object.assign({}, newItem));
    service.add(Object.assign({}, newItem));

    let index = 8;

    service.ListOfLVs.forEach(lv => {
      expect(lv.id).toBe(index);
      --index;
    });
  }));
});
