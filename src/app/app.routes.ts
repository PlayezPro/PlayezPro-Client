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
import { blockPage } from './guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [blockPage]
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/noticeV/noticeV.page').then(c => c.NoticePageV),
    canActivate: [blockPage]

  },
  {
    path: 'reel',
    loadComponent: () => import('./pages/reel/reel.page').then(m => m.ReelPage),
    canActivate: [blockPage]

  },
  {
    path: 'search',
    component: ManagePostPage,
    canActivate: [blockPage]
  },
  {
    path: 'create-post',
    component: CreatePostPage,
    canActivate: [blockPage]
  },
  {
    path: 'ranking',
    component: RanksPagePage,
    canActivate: [blockPage]
    
  },
  {
    path: 'ranked-goals',
    component: RankByGoalComponent,
    canActivate: [blockPage]
  },
  {
    path: 'ranked-plays',
    component: RankByPlayComponent,
    canActivate: [blockPage]
  },
  {
    path: 'ranked-assistance',
    component: RankByAssistanceComponent,
    canActivate: [blockPage]
  },
  {
    path: 'ranked-defense',
    component: RankByDefenseComponent,
    canActivate: [blockPage]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/perfil/perfil.page').then(m => m.PerfilPage),
    canActivate: [blockPage]
  },
  {
    path: 'manage-user/:users_id',
    loadComponent: () => import('./pages/manage-user/manage-user.page').then(m => m.ManageUserPage),
    canActivate: [blockPage]
  },
  {
    path: 'rank-by-goal',
    loadComponent: () => import('./pages/rank-by-goal/rank-by-goal.page').then(m => m.RankByGoalComponent),
    canActivate: [blockPage]
  },
  {
    path: 'rank-by-play',
    loadComponent: () => import('./pages/rank-by-play/rank-by-play.page').then(m => m.RankByPlayComponent),
    canActivate: [blockPage]
  },
  {
    path: 'rank-by-assistance',
    loadComponent: () => import('./pages/rank-by-assistance/rank-by-assistance.page').then(m => m.RankByAssistanceComponent),
    canActivate: [blockPage]
  },
  {
    path: 'rank-by-defense',
    loadComponent: () => import('./pages/rank-by-defense/rank-by-defense.page').then( m => m.RankByDefenseComponent),
    canActivate: [blockPage]
  },
  {
    path: 'setting',
    loadComponent: () => import('./pages/setting/setting.page').then( m => m.SettingPage),
    canActivate: [blockPage]
  },
];
