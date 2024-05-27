import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RankByAssistancePage } from './rank-by-assistance.page';

describe('RankByAssistancePage', () => {
  let component: RankByAssistancePage;
  let fixture: ComponentFixture<RankByAssistancePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RankByAssistancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
