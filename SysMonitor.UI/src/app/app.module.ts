import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SparklineComponent } from './sparkline/sparkline.component';
import { FanComponent } from './fan/fan.component';
import { FansContainerComponent } from './fans-container/fans-container.component';
import { GpuContainerComponent } from './gpu-container/gpu-container.component';
import { GpuComponent } from './gpu/gpu.component';

@NgModule({
    declarations: [
        AppComponent,
        FanComponent,
        FansContainerComponent,
        GpuComponent,
        GpuContainerComponent,
        SparklineComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
