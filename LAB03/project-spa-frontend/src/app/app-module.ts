import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ProjectComponent } from './project/project.component';
import{HttpClientModule} from '@angular/common/http';
import {ProjectService} from './services/project.service';

@NgModule({
  declarations: [
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ProjectService,
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [ProjectComponent]
})
export class AppModule { }
