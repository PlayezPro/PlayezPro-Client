import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RankByDefensePage } from './rank-by-defense.page';

describe('RankByDefensePage', () => {
  let component: RankByDefensePage;
  let fixture: ComponentFixture<RankByDefensePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RankByDefensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
