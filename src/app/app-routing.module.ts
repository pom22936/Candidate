import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CompleteComponent } from './complete/complete.component';

const appRoutes: Routes = [
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'user-details', component: UserDetailsComponent },
  { path: 'Complete', component: CompleteComponent },
  { path: '',
    redirectTo: '/user-profile',
    pathMatch: 'full'
  },
  { path: '**', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,{ enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
