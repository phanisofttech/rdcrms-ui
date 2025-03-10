import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationFilterComponent } from './location-filter.component';

describe('LocationFilterComponent', () => {
  let component: LocationFilterComponent;
  let fixture: ComponentFixture<LocationFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
