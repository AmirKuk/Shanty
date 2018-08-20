import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentInfoComponent } from './apartment-info.component';

describe('ApartmentInfoComponent', () => {
  let component: ApartmentInfoComponent;
  let fixture: ComponentFixture<ApartmentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartmentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
