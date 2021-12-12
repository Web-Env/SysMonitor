import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SparklineComponent } from './sparkline/sparkline.component';
import { FanComponent } from './fan/fan.component';

@NgModule({
    declarations: [
        AppComponent,
        SparklineComponent,
        FanComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
