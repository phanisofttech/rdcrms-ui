import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterationComponent } from './user-registeration.component';

describe('UserRegisterationComponent', () => {
  let component: UserRegisterationComponent;
  let fixture: ComponentFixture<UserRegisterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRegisterationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
