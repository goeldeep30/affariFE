import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChipsModule } from 'primeng/chips';
import { SliderModule } from 'primeng/slider';
import { InputTextModule } from 'primeng/inputtext';
import { DragDropModule } from 'primeng/dragdrop';
import { MaterialModule } from './shared/material-module';
import { PrimeNgModule } from './shared/prime-ng-module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { KanbanComponent } from './kanban/kanban.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ProjectsComponent } from './projects/projects.component';
import { TokenIntercepterService } from './token-intercepter.service';
import { AuthGuard } from './auth.guard';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CreateProjectComponent } from './create-project/create-project.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KanbanComponent,
    NavbarComponent,
    TaskCardComponent,
    SideNavComponent,
    ProjectsComponent,
    CreateTaskComponent,
    CreateProjectComponent,
  ],
  entryComponents: [
    CreateTaskComponent,
    CreateProjectComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    SliderModule,
    InputTextModule,
    FormsModule,
    AppRoutingModule,
    ChipsModule,
    DragDropModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimeNgModule,
    HttpClientModule,

  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenIntercepterService, multi: true },
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
