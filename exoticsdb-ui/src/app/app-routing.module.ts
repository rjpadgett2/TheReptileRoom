import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ViewAnimalsComponent } from './components/pages/view-animals/view-animals.component';
import {AuthGuard} from './services/auth-guard.service';
import {LoggedIn} from './services/logged-in';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        resolve: [LoggedIn]
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard]
    },
  {
    path: 'view/:id',
    component: ViewAnimalsComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
