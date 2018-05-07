import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LehrveranstaltungenService, Lehrveranstaltung } from '../../services/lehrveranstaltungen.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-lv-create',
  templateUrl: './lv-create.component.html',
  styleUrls: ['./lv-create.component.css']
})
export class LvCreateComponent implements OnInit, OnDestroy {
  ListOfLVs$: Observable<Lehrveranstaltung[]>;

  private authSubscription: Subscription;
  isLoggedIn: boolean;

  newLvForm: FormGroup;

  fullname = '';
  abbreviation = '';
  lector = '';
  ects = null;
  exam = '';
  moodle = '';

  constructor(private LVs: LehrveranstaltungenService, private fb: FormBuilder, private oAuthService: OAuthService) {
    this.ListOfLVs$ = LVs.ListOfLVs$;
    this.createForm();
  }

  ngOnInit() {
    this.authSubscription = this.oAuthService.events.subscribe(() => this.updateStatus());
    this.updateStatus();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private updateStatus() {
    this.isLoggedIn = this.oAuthService.hasValidAccessToken();
  }

  createForm() {
    this.newLvForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(5)]],
      abbreviation: ['', [Validators.required, Validators.maxLength(5)]],
      lector: ['', [Validators.required, Validators.minLength(5)]],
      ects: [0, [Validators.required, Validators.min(0.5), Validators.max(5)]],
      exam: new Date(),
      moodle: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });
  }

  submit() {
    const value = this.newLvForm.value;
    const LV: Lehrveranstaltung = {
      id: 0,
      fullname: value.fullname,
      abbreviation: value.abbreviation,
      lector: value.lector,
      ects: value.ects,
      exam: value.exam,
      moodle: value.moodle
    };
    this.LVs.add(LV).subscribe();

    this.newLvForm.reset();
    this.newLvForm.patchValue({
      exam: new Date()
    });
  }
}
