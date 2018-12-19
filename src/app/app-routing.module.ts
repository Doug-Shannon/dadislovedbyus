import { CanRegister } from './services/guards/can-register.guard';
import { ShowComponent } from './components/show/show.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TellComponent } from './components/tell/tell.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoggedInGuard } from './services/guards/logged-in.guard';
import { RegisteredGuard } from './services/guards/registered-guard';

const routes: Routes = [
  {
    path: 'tell',
    component: TellComponent,
    canActivate: [RegisteredGuard]
  },
  {
    path: 'show',
    component: ShowComponent,
    canActivate: [RegisteredGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [CanRegister]
  },
  {
    path: '',
    component: ShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
