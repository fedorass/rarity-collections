import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumismaticsComponent } from './numismatics.component';

describe('NumismaticsComponent', () => {
  let component: NumismaticsComponent;
  let fixture: ComponentFixture<NumismaticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumismaticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumismaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
