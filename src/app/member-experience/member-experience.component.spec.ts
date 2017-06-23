import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberExperienceComponent } from './member-experience.component';

describe('MemberExperienceComponent', () => {
  let component: MemberExperienceComponent;
  let fixture: ComponentFixture<MemberExperienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
