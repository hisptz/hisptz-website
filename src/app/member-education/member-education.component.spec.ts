import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEducationComponent } from './member-education.component';

describe('MemberEducationComponent', () => {
  let component: MemberEducationComponent;
  let fixture: ComponentFixture<MemberEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
