import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CprinitiationhomeComponent } from './cprinitiationhome.component';

describe('CprinitiationhomeComponent', () => {
  let component: CprinitiationhomeComponent;
  let fixture: ComponentFixture<CprinitiationhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CprinitiationhomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CprinitiationhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
