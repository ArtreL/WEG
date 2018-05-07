import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LehrveranstaltungenService, Lehrveranstaltung } from '../../services/lehrveranstaltungen.service';
import { LoginStatusComponent } from '.././login-status/login-status.component';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-lv-overview',
  templateUrl: './lv-overview.component.html',
  styleUrls: ['./lv-overview.component.css']
})
export class LvOverviewComponent implements OnInit {
  ListOfLVs$: Observable<Lehrveranstaltung[]>;

  constructor(private LVs: LehrveranstaltungenService) {
    this.ListOfLVs$ = LVs.ListOfLVs$;
  }

  ngOnInit() {
  }

  public removeLV(LV: Lehrveranstaltung) {
    this.LVs.remove(LV.id);
  }
}
