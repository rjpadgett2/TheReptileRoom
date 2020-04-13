import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeederFormComponent } from './feeder-form.component';

describe('FeederFormComponent', () => {
  let component: FeederFormComponent;
  let fixture: ComponentFixture<FeederFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeederFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeederFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
