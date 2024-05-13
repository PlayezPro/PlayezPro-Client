import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManagePostPage } from './manage-post.page';

describe('ManagePostPage', () => {
  let component: ManagePostPage;
  let fixture: ComponentFixture<ManagePostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
