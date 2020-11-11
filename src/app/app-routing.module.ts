import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// 3.1) Importando dependências
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const toLogin = () => redirectUnauthorizedTo(['/user/login']);
const isLogged = () => redirectLoggedInTo(['/']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin }
  },
  {
    path: 'info',
    loadChildren: () => import('./pages/info/info.module').then(m => m.InfoPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin }
  },
  {
    path: 'contato',
    loadChildren: () => import('./pages/contato/contato.module').then(m => m.ContatoPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin }
  },
  {
    path: 'test01',
    loadChildren: () => import('./pages/test01/test01.module').then(m => m.Test01PageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin }
  },
  {
    path: 'test02',
    loadChildren: () => import('./pages/test02/test02.module').then(m => m.Test02PageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin }
  },
  {
    path: 'user/login',
    loadChildren: () => import('./user/login/login.module').then(m => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: isLogged }
  },
  {
    path: 'user/logout',
    loadChildren: () => import('./user/logout/logout.module').then(m => m.LogoutPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin }
  },
  {
    path: 'user/new',
    loadChildren: () => import('./user/new/new.module').then(m => m.NewPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin }
  },
  {
    path: 'user/profile',
    loadChildren: () => import('./user/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: toLogin }
  },
  {
    path: '**',
    loadChildren: () => import('./pages/e404/e404.module').then(m => m.E404PageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }