import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'Crud',
    loadChildren: () => import('./crud/crud.module').then((m) => m.CrudModule),
  },
  {
    path: 'Post',
    loadChildren: () => import('./post/post.module').then((m) => m.PostModule),
  },
  {
    path: 'Categories',
    loadChildren: () => import('./category/category.module').then((m) => m.CategoryModule),
  },
  {
    path: 'Register',
    loadChildren: () => import('./registration/registration.module').then((m) => m.RegistrationModule),
  },
  {
    path: 'Login',
    loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),
  },
  { path: '**',   redirectTo: '/Crud'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
