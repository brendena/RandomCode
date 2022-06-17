import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import the ButtonsModule
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { MenuComponent } from './menu/menu.component';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { GooglePickerComponent } from './google-picker/google-picker.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    GoogleLoginComponent,
    GooglePickerComponent,
    ErrorMessageComponent,
  ],
  imports: [
     BrowserModule,
    FormsModule,
    HttpModule,

    // Register the modules
    BrowserAnimationsModule,
    ButtonsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
