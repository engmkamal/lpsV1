import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormwidgetsComponent } from './formwidgets.component';

describe('FormwidgetsComponent', () => {
  let component: FormwidgetsComponent;
  let fixture: ComponentFixture<FormwidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormwidgetsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormwidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
