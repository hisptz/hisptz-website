import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HisptzServicesComponent } from './hisptz-services.component';

describe('HisptzServicesComponent', () => {
  let component: HisptzServicesComponent;
  let fixture: ComponentFixture<HisptzServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HisptzServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HisptzServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
