import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigparentComponent } from './configparent.component';

describe('ConfigparentComponent', () => {
  let component: ConfigparentComponent;
  let fixture: ComponentFixture<ConfigparentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigparentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigparentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
