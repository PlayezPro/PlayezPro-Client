import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticePage } from './noticeV.page';

describe('NoticePage', () => {
  let component: NoticePage;
  let fixture: ComponentFixture<NoticePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});