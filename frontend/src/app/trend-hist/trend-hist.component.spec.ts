import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendHistComponent } from './trend-hist.component';

describe('ChartComponent', () => {
  let component: TrendHistComponent;
  let fixture: ComponentFixture<TrendHistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendHistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendHistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
