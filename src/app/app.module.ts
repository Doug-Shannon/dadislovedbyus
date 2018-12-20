// INTERNAL
//// BUILD
import { environment } from 'src/environments/environment';

//// COMPONENTS
import { ShowComponent } from './components/show/show.component';
import { AppRoutingModule } from './app-routing.module';
import { TellComponent } from './components/tell/tell.component';
import { LoginComponent } from './components/login/login.component';
import { ShellComponent } from './components/shell/shell.component';
import { AppComponent } from './components/app/app.component';
import { RegisterComponent } from './components/register/register.component';
import { UploadComponent } from 'app/components/uploads/upload/upload.component';

// PIPES
import { FileSizePipe } from './components/uploads/file-size.pipe';

//// STATE
import { reducers, metaReducers, AppState } from 'app/state/reducers';
import { AuthEffects } from 'app/state/effects/auth.effects';

// 3RD PARTY
//// ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule, BREAKPOINT } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

//// NGRX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

//// FIRESTORE
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

//// MATERIAL
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatExpansionModule, MatCardModule, MatDividerModule, MatSnackBarModule } from '@angular/material';
import { AboutEffects } from './state/effects/about.effects';
import { LoadingComponent } from './components/loading/loading.component';

const PRINT_BREAKPOINTS = [
  {
    alias: 'xs.print',
    suffix: 'XsPrint',
    mediaQuery: 'print and (max-width: 297px)',
    overlapping: false
  }
];

@NgModule({
  declarations: [ShowComponent, TellComponent, LoginComponent, ShellComponent, AppComponent, RegisterComponent, UploadComponent, FileSizePipe, LoadingComponent],
  imports: [
    // ANGULAR
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // NGRX
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AuthEffects, AboutEffects]),
    // FIREBASE
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    // MATERIAL
    BrowserAnimationsModule,
    FlexLayoutModule.withConfig({ useColumnBasisZero: false }),
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  providers: [AngularFirestore, { provide: BREAKPOINT, useValue: PRINT_BREAKPOINTS, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
