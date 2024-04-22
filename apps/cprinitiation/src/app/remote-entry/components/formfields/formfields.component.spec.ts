import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormfieldsComponent } from './formfields.component';

describe('FormfieldsComponent', () => {
  let component: FormfieldsComponent;
  let fixture: ComponentFixture<FormfieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormfieldsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
