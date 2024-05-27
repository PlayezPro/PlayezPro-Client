import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RankByGoalPage } from './rank-by-goal.page';

describe('RankByGoalPage', () => {
  let component: RankByGoalPage;
  let fixture: ComponentFixture<RankByGoalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RankByGoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
