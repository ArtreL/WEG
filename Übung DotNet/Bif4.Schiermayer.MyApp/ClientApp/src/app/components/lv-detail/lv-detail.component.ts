import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { LehrveranstaltungenService, Lehrveranstaltung } from '../../services/lehrveranstaltungen.service';

@Component({
  selector: 'app-lv-detail',
  templateUrl: './lv-detail.component.html',
  styleUrls: ['./lv-detail.component.css']
})
export class LvDetailComponent implements OnInit {
  ListOfLVs$: Observable<Lehrveranstaltung[]>;
  currLV$?: Observable<Lehrveranstaltung>;

  private routeSubscription?: Subscription;

  constructor(private LVs: LehrveranstaltungenService, private activatedRoute: ActivatedRoute) {
    this.ListOfLVs$ = LVs.ListOfLVs$;
  }

  ngOnInit() {
    this.routeSubscription =
      this.activatedRoute.params.subscribe(params => {
      this.currLV$ = this.LVs.find(+params['id']);
      });
  }
}
