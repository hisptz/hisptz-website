import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberContactsComponent } from './member-contacts.component';

describe('MemberContactsComponent', () => {
  let component: MemberContactsComponent;
  let fixture: ComponentFixture<MemberContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
