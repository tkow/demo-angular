import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SpeechTextComponent } from './speech-text/speech-text.component';
import { SlidesComponent } from './slides/slides.component';
import { SlideComponent } from './slides/slide/slide.component';

import { SlidesService } from './slides/slides.service';
import { SlideBusService } from './slides/slide-bus.service'
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SpeechTextComponent,
    SlidesComponent,
    SlideComponent,
    // BrowserAnimationsModule
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [SlidesService, SlideBusService, SlidesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
