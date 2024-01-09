import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomepageComponent} from "../webapp/components/homepage/homepage.component";
import {NavBarComponent} from "../webapp/components/nav-bar/nav-bar.component";
import {CdkListbox, CdkOption} from "@angular/cdk/listbox";
import {CdkTreeModule} from "@angular/cdk/tree";
import {UserService} from "../webapp/services/user/user.service";
import {ProfileModule} from "../webapp/components/profile/profile.module";
import {HttpClient} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProfileModule,
    CdkListbox,
    CdkOption,
    CdkTreeModule
  ],
  providers: [UserService,
              HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
