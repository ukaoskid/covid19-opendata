import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Covid19DataService } from './services/covid/covid19-data.service';
import { TrendHistComponent } from './trend-hist/trend-hist.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { GrowthFactorComponent } from './growth-factor/growth-factor.component';
import { TotalizersComponent } from './totalizers/totalizers.component';
import { SparklineComponent } from './sparkline/sparkline.component';

@NgModule({
  declarations: [
    AppComponent,
    TrendHistComponent,
    GrowthFactorComponent,
    TotalizersComponent,
    SparklineComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NgxChartsModule,
    NgbModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [Covid19DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
