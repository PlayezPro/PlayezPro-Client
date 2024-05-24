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
    path: '',
    component: LoginComponent
  },  
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/notice/notice.page').then(c => c.NoticePage )
  },
  {
    path: 'reel',
    loadComponent: () => import('./pages/reel/reel.page').then( m => m.ReelPage)
  },
  {
    path: 'search',
    component: ManagePostPage
  },
  {
    path: 'create-post',
    component: CreatePostPage
  },
  {
    path: 'ranking',
    component: RanksPagePage
  },
  {
    path: 'ranked-goals',
    component: RankingSystemComponent 
  },
  // {
  //   path: 'ranked-plays',
  //   component: RankingSystemComponent 
  // },
  // {
  //   path: 'ranked-assistance',
  //   component: RankingSystemComponent 
  // },
  // {
    //   path: 'ranked-defense',
    //   component: RankingSystemComponent 
    // },
  {
    path: 'profile',
    component: PerfilPage
  },
  {
    path: 'manage-user/:users_id',
    loadComponent: () => import('./pages/manage-user/manage-user.page').then(m => m.ManageUserPage)
  },

];
