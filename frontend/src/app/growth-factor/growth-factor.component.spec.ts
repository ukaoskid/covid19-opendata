import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowthFactorComponent } from './growth-factor.component';

describe('GrowtFactorComponent', () => {
  let component: GrowthFactorComponent;
  let fixture: ComponentFixture<GrowthFactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrowthFactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowthFactorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
