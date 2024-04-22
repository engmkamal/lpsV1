import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldrendererComponent } from './fieldrenderer.component';

describe('FieldrendererComponent', () => {
  let component: FieldrendererComponent;
  let fixture: ComponentFixture<FieldrendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FieldrendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldrendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
