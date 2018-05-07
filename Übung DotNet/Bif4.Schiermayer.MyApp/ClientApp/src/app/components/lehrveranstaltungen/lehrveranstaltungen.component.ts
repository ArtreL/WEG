import { Component, OnInit } from '@angular/core';
import { LehrveranstaltungenService, Lehrveranstaltung } from '../../services/lehrveranstaltungen.service';

@Component({
  selector: 'app-lehrveranstaltungen',
  templateUrl: './lehrveranstaltungen.component.html',
  styleUrls: ['./lehrveranstaltungen.component.css']
})
export class LehrveranstaltungenComponent implements OnInit {

  ListOfLVs: Lehrveranstaltung[];
  id = 0;

  constructor() { }

  ngOnInit() {
    this.ListOfLVs = [
      {
        fullname: 'Angewandte Mathematik 2',
        abbreviation: 'MATU',
        lector: 'Susanne Teschl',
        ects: 3,
        exam: '20.6.2018',
        moodle: '6048',
        id: ++this.id
      },
      {
        fullname: 'Business Communication for Engineers',
        abbreviation: 'BCO',
        lector: 'Patrizia Spella',
        ects: 1.5,
        exam: '-',
        moodle: '5567',
        id: ++this.id
      },
      {
        fullname: 'Datensicherheit 2',
        abbreviation: 'DASU',
        lector: 'Alexander Mense',
        ects: 1.5,
        exam: '29.04.2018',
        moodle: '4462',
        id: ++this.id
      }
    ];
  }
}
