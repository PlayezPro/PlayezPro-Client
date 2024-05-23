import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CreatePostPage } from './pages/create-post/create-post.page';
import { PerfilPage } from './pages/perfil/perfil.page';
import { ManagePostPage } from './pages/manage-post/manage-post.page';
import { RankingSystemComponent } from './pages/Rankings/ranking-system/ranking-system.page';
import { RanksPagePage } from './pages/ranks-page/ranks-page.page';

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
    path: 'manage-post',
    component: ManagePostPage
  },
  {
    path: 'login',
    component: LoginComponent
  },  
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'ranking',
    component: RanksPagePage
  },
  {
    path: 'ranked-goals',
    component: RankingSystemComponent 
  },
  {
    path: 'reel',
    loadComponent: () => import('./pages/reel/reel.page').then( m => m.ReelPage)
  },
  {
    path: 'manage-user/:users_id',
    loadComponent: () => import('./pages/manage-user/manage-user.page').then(m => m.ManageUserPage)
  },
  {
    path: 'noticeV',
    loadComponent: () => import('./pages/noticeV/noticeV.page').then(c => c.NoticePageV )
  },


];
