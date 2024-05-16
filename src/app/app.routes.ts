import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CreatePostPage } from './pages/create-post/create-post.page';
import { PerfilPage } from './pages/perfil/perfil.page';
import { ManageUserPage } from './pages/manage-user/manage-user.page';
import { ManagePostPage } from './pages/manage-post/manage-post.page';
import { NoticePage } from './pages/notice/notice.page';

export const routes: Routes = [
  {
    path: 'notice',
    loadComponent: () => import('./pages/notice/notice.page').then(c => c.NoticePage )
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
    path: 'login',
    component: LoginComponent
  },  {
    path: 'register',
    component: RegisterComponent,
  }

];
