import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasteComponent } from './caste.component';

describe('CasteComponent', () => {
  let component: CasteComponent;
  let fixture: ComponentFixture<CasteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CasteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
