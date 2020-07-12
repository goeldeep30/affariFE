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
import { MaterialModule } from './shared/material-module'
import { PrimeNgModule } from './shared/prime-ng-module'
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { KanbanComponent } from './kanban/kanban.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KanbanComponent,
    NavbarComponent,
    TaskCardComponent,
    SideNavComponent,
    ProjectsComponent
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
    HttpClientModule
  ],
  providers: [{ provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
