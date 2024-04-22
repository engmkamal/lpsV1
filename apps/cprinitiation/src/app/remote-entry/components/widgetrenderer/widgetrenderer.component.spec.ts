import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetrendererComponent } from './widgetrenderer.component';

describe('WidgetrendererComponent', () => {
  let component: WidgetrendererComponent;
  let fixture: ComponentFixture<WidgetrendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetrendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetrendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
