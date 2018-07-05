import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindMeApartmentComponent } from './find-me-apartment.component';

describe('FindMeApartmentComponent', () => {
  let component: FindMeApartmentComponent;
  let fixture: ComponentFixture<FindMeApartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindMeApartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindMeApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
