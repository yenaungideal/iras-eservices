import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonUiLibraryModule } from '../../../common-ui-lib/src/lib/common-ui-library.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuModule } from './menu/menu.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FlexLayoutModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonUiLibraryModule,
    AppRoutingModule,
    MenuModule,
  ],
  schemas: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
