import { Routes } from '@angular/router';
import { CreatePostPage } from './pages/create-post/create-post.page';
import { PerfilPage } from './pages/perfil/perfil.page';
import { ManageUserPage } from './pages/manage-user/manage-user.page';
import { ManagePostPage } from './pages/manage-post/manage-post.page';
import { NoticePage } from './pages/notice/notice.page';

export const routes: Routes = [
  {
    path: '',
    component: NoticePage
  },
  {
    path: 'create-post',
    component: CreatePostPage
  },
  {
    path: 'perfil',
    component: PerfilPage
  },
  {
    path: 'manage-user',
    component: ManageUserPage
  },
  {
    path: 'manage-post',
    component: ManagePostPage
  },
  {
    path: 'notice',
    loadComponent: () => import('./pages/notice/notice.page').then( m => m.NoticePage)
  },




];
