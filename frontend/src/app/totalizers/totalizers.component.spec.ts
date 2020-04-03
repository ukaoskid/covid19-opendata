import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalizersComponent } from './totalizers.component';

describe('TotalizersComponent', () => {
  let component: TotalizersComponent;
  let fixture: ComponentFixture<TotalizersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalizersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalizersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
