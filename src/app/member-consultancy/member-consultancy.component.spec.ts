import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberConsultancyComponent } from './member-consultancy.component';

describe('MemberConsultancyComponent', () => {
  let component: MemberConsultancyComponent;
  let fixture: ComponentFixture<MemberConsultancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberConsultancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberConsultancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
