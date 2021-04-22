import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './pages/register/register.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeBackendService } from './fake-backend.service';
import { AppService } from './app.service';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HttpClientModule,
    BrowserModule,
    FormsModule
  ],
  imports: [
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(MyInMemoryService),
    InMemoryWebApiModule.forRoot(FakeBackendService),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
