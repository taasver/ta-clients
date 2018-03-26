import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';
import { ClientsComponent }  from './clients/clients.component';
import { ClientsService } from './clients/clients.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ ClientsService ],
  declarations: [
    AppComponent,
    ClientsComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}