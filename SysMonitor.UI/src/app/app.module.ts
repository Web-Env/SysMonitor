import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FanComponent } from './components/fans-container/fan/fan.component';
import { FansContainerComponent } from './components/fans-container/fans-container.component';
import { GpuContainerComponent } from './components/gpu-container/gpu-container.component';
import { GpuImageComponent } from './components/gpu-container/gpu-image/gpu-image.component';
import { SparklineComponent } from './components/sparkline/sparkline.component';

@NgModule({
    declarations: [
        AppComponent,
        FanComponent,
        FansContainerComponent,
        GpuContainerComponent,
        GpuImageComponent,
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
