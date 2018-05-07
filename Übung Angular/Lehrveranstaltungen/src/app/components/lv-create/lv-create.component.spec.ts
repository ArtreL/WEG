import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { LvCreateComponent } from './lv-create.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LehrveranstaltungenService } from '../../services/lehrveranstaltungen.service';

describe('LvCreateComponent', () => {
  let component: LvCreateComponent;
  let fixture: ComponentFixture<LvCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LvCreateComponent,
        NavbarComponent
      ],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
      ],
      providers: [
        LehrveranstaltungenService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LvCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shall have a valid form model for valid input', () => {
    component.newLvForm.patchValue({
      fullname: 'Herberting 2',
      abbreviation: 'HEB2',
      lector: 'Herbert Herbertson',
      ects: '3',
      exam: new Date(),
      moodle: '1234'
    });

    expect(component.newLvForm.valid).toBe(true);
  });

  it('shall have errors for invalid form values', () => {
    component.newLvForm.patchValue({
      fullname: 'HEB2',
      abbreviation: 'Herberting 2',
      lector: 'Herb',
      ects: '4',
      exam: new Date(),
      moodle: '11234'
    });

    expect(component.newLvForm.valid).toBe(false);
    expect(component.newLvForm.get('fullname').valid).toBe(false);
    expect(component.newLvForm.get('abbreviation').valid).toBe(false);
    expect(component.newLvForm.get('lector').valid).toBe(false);
    expect(component.newLvForm.get('ects').valid).toBe(false);
    expect(component.newLvForm.get('moodle').valid).toBe(false);
  });
});
