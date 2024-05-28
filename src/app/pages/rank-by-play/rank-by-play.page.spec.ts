import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RankByPlayPage } from './rank-by-play.page';

describe('RankByPlayPage', () => {
  let component: RankByPlayPage;
  let fixture: ComponentFixture<RankByPlayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RankByPlayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
