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
import { TaskCardComponent } from './kanban/task-card/task-card.component';
import { CreateTaskComponent } from './kanban/create-task/create-task.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectCardComponent } from './projects/project-card/project-card.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { TokenIntercepterService } from './token-intercepter.service';
import { AuthGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { HomeComponent } from './home/home.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';


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
    SignupComponent,
    InfoDialogComponent,
    ProjectCardComponent,
    HomeComponent,
    ConfirmDialogComponent,
  ],
  entryComponents: [
    CreateTaskComponent,
    CreateProjectComponent,
    InfoDialogComponent,
    ConfirmDialogComponent,
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
