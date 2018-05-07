import { Component } from '@angular/core';
import { LehrveranstaltungenService, Lehrveranstaltung } from './services/lehrveranstaltungen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LehrveranstaltungenService]
})
export class AppComponent {
  title = 'app';
}
