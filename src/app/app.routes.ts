import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'create-post',
    loadComponent: () => import('./pages/create-post/create-post.page').then( m => m.CreatePostPage)
  },

];
