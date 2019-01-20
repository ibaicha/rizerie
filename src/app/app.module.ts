import { HeaderComponent } from './composants/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ApplicationRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { HomeComponent } from './composants/home/home.component';

import { NavigationComponent } from './composants/navigation/navigation.component';
import { FooterComponent } from './composants/footer/footer.component';

import { LoginDialogComponent } from './composants/header/login-dialog/login-dialog.component';
import { MouvementComponent } from './composants/mouvement/mouvement.component';

import { AppService } from './services/app.service';
import {LoginService } from './services/login.service';
import {NavigationService } from './services/navigation.service';
import {ShareService } from './services/share.service';

import {MouvementService } from './services/mouvement.service';
import {LoaderService } from './services/loader.service';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';


import {CdkTableModule} from '@angular/cdk/table';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MOMENT_DATE_FORMATS } from './moment-date-adapter';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { ChartsModule } from 'ng2-charts';



import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,

  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  DateAdapter,
  MAT_NATIVE_DATE_FORMATS

} from '@angular/material';

import { CommonModule, DatePipe } from '@angular/common';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { MouvementDialogComponent } from './composants/mouvement/mouvement-dialog/mouvement-dialog.component';
import { RemboursementAgenceFilterPipe } from './pipes/remboursement-agence-filter.pipe';
import {PusherService} from './services/pusher.service';


const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'navigation',
    component: NavigationComponent
  },
  {
    path: 'mouvement',
    component: MouvementComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    LoginDialogComponent,
    MouvementComponent,
    MouvementDialogComponent,
    RemboursementAgenceFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDVUkv2yRBd7QbRdhn6WTS8gbRGaHov13I',
      libraries: ['geometry']
    }),

    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,

    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,

    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ChartsModule,

  ],
  providers: [
    AppService,
    LoginService,
    ShareService,
    MouvementService,
    NavigationService,
    LoaderService,
    RemboursementAgenceFilterPipe,
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
   // { provide: MAT_DATE_FORMATS, useValue: MOMENT_DATE_FORMATS },
   // { provide: DateAdapter, useClass: MomentDateAdapter },

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    PusherService,
    DatePipe,
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  entryComponents: [
    LoginDialogComponent,
    MouvementDialogComponent
  ]
})
export class AppModule { }

