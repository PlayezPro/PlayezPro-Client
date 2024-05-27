import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CreatePostPage } from './pages/create-post/create-post.page';
import { PerfilPage } from './pages/perfil/perfil.page';
import { ManagePostPage } from './pages/manage-post/manage-post.page';
import { RanksPagePage } from './pages/ranks-page/ranks-page.page';
import { RankByGoalComponent } from './pages/rank-by-goal/rank-by-goal.page';
import { RankByPlayComponent } from './pages/rank-by-play/rank-by-play.page';
import { RankByDefenseComponent } from './pages/rank-by-defense/rank-by-defense.page';
import { RankByAssistanceComponent } from './pages/rank-by-assistance/rank-by-assistance.page';

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
    component:  RankByGoalComponent
  },
  {
    path: 'ranked-plays',
    component: RankByPlayComponent
  },
  {
    path: 'ranked-assistance',
    component: RankByAssistanceComponent
  },
  {
      path: 'ranked-defense',
      component: RankByDefenseComponent
    },
  {
    path: 'profile',
    component: PerfilPage
  },
  {
    path: 'manage-user/:users_id',
    loadComponent: () => import('./pages/manage-user/manage-user.page').then(m => m.ManageUserPage)
  },
  {
    path: 'noticeV',
    loadComponent: () => import('./pages/noticeV/noticeV.page').then(c => c.NoticePageV )
  },  {
    path: 'rank-by-goal',
    loadComponent: () => import('./pages/rank-by-goal/rank-by-goal.page').then( m => m.RankByGoalComponent)
  },
  {
    path: 'rank-by-play',
    loadComponent: () => import('./pages/rank-by-play/rank-by-play.page').then( m => m.RankByPlayComponent)
  },
  {
    path: 'rank-by-assistance',
    loadComponent: () => import('./pages/rank-by-assistance/rank-by-assistance.page').then( m => m.RankByAssistanceComponent)
  },
  {
    path: 'rank-by-defense',
    loadComponent: () => import('./pages/rank-by-defense/rank-by-defense.page').then( m => m.RankByDefenseComponent)
  },




];
