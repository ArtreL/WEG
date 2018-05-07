import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LvDetailComponent } from './lv-detail.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LehrveranstaltungenService } from '../../services/lehrveranstaltungen.service';

describe('LvDetailComponent', () => {
  let component: LvDetailComponent;
  let fixture: ComponentFixture<LvDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LvDetailComponent,
        NavbarComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        LehrveranstaltungenService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LvDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
