import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteTrafficComponent } from './website-traffic.component';

describe('WebsiteTrafficComponent', () => {
  let component: WebsiteTrafficComponent;
  let fixture: ComponentFixture<WebsiteTrafficComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WebsiteTrafficComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsiteTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
