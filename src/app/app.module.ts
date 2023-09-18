import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderComponent } from './components/header/header.component';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { UserComponent } from './pages/user/user.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpHandler, HttpRequest } from '@angular/common/http';
import { ApiserviceService } from '././services/apiservice.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,

    MatSlideToggleModule,
    MatPaginatorModule,
    MatTableModule,

    HttpClientModule,
  ],
  providers: [
    ApiserviceService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authReq = req.clone({
      setHeaders:
      {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache'
      }
    });
    return next.handle(authReq);
  }
}
