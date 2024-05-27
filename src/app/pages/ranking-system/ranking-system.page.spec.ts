import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RankingSystemPage } from './ranking-system.page';

describe('RankingSystemPage', () => {
  let component: RankingSystemPage;
  let fixture: ComponentFixture<RankingSystemPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingSystemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
