import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBusComponent } from './list-bus.component';

describe('ListBusComponent', () => {
  let component: ListBusComponent;
  let fixture: ComponentFixture<ListBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
