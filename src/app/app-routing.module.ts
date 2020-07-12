import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { KanbanComponent } from './kanban/kanban.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'kanban/:projectid', component: KanbanComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
