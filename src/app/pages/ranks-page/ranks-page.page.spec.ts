import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RanksPagePage } from './ranks-page.page';

describe('RanksPagePage', () => {
  let component: RanksPagePage;
  let fixture: ComponentFixture<RanksPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RanksPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
