import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomePage } from './pages/home/home.page';
import { CreatePostPage } from './pages/create-post/create-post.page';



export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'create-post',
    component: CreatePostPage
  },
  {
    path: 'register',
    component: RegisterComponent,
  }

];
