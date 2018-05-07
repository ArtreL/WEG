import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LvOverviewComponent } from './lv-overview.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LehrveranstaltungenService } from '../../services/lehrveranstaltungen.service';

describe('LvOverviewComponent', () => {
  let component: LvOverviewComponent;
  let fixture: ComponentFixture<LvOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LvOverviewComponent,
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
    fixture = TestBed.createComponent(LvOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
