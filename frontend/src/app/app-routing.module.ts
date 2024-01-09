import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "../webapp/components/homepage/homepage.component";
import {ProfileComponent} from "../webapp/components/profile/profile.component";
import {SubscriptionsComponent} from "../webapp/components/subscriptions/subscriptions.component";
import {ExploreComponent} from "../webapp/components/explore/explore.component";
import {ManageExercisesComponent} from "../webapp/components/exercise/manage-exercises/manage-exercises.component";
import {ManageWorkoutsComponent} from "../webapp/components/workout/manage-workouts/manage-workouts.component";
import {LoginComponent} from "../webapp/components/account/login/login.component";
import {RegisterComponent} from "../webapp/components/account/register/register.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'subscriptions', component: SubscriptionsComponent},
  {path: 'explore', component: ExploreComponent},
  {path: 'exercises', component: ManageExercisesComponent},
  {path: 'workouts', component: ManageWorkoutsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
