import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { HighlightSelectedDateDirective } from './datepicker/directives/highlight-selected-date.directive';

@NgModule({
  declarations: [
    AppComponent,
    DatepickerComponent,
    HighlightSelectedDateDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
