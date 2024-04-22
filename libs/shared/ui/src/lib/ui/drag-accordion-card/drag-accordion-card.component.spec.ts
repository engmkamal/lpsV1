import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DragAccordionCardComponent } from './drag-accordion-card.component';

describe('DragAccordionCardComponent', () => {
  let component: DragAccordionCardComponent;
  let fixture: ComponentFixture<DragAccordionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragAccordionCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DragAccordionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
