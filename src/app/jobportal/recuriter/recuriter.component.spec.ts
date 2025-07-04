import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuriterComponent } from './recuriter.component';

describe('RecuriterComponent', () => {
  let component: RecuriterComponent;
  let fixture: ComponentFixture<RecuriterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuriterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
