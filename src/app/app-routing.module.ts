import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
// import { CreateTaskComponent } from './components/create-task/create-task.component';
import { AuthGuard } from './auth.guard';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';

const routes: Routes = [
  {path: '', component: SignupComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  { path: 'to-do-list', component: ToDoListComponent, canActivate: [AuthGuard]},
  { path: 'create-task', component: CreateTaskComponent, canActivate: [AuthGuard]},

  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
