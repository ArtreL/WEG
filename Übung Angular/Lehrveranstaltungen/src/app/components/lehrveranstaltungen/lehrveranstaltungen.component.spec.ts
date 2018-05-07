import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LehrveranstaltungenComponent } from './lehrveranstaltungen.component';
import { NavbarComponent } from '../navbar/navbar.component';

describe('LehrveranstaltungenComponent', () => {
  let component: LehrveranstaltungenComponent;
  let fixture: ComponentFixture<LehrveranstaltungenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LehrveranstaltungenComponent,
        NavbarComponent
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LehrveranstaltungenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
