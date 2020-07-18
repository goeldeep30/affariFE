import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent} from './projects/projects.component';
import { KanbanComponent } from './kanban/kanban.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'kanban/:projectid', component: KanbanComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
