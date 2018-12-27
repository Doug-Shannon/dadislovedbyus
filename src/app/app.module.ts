import { UserEffects } from './state/effects/user.effects';
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
import {
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatExpansionModule,
  MatCardModule,
  MatDividerModule,
  MatSnackBarModule
} from '@angular/material';
import { AboutEffects } from './state/effects/about.effects';
import { LoadingComponent } from './components/loading/loading.component';
import { AttributeComponent } from './components/attribute/attribute.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserCircleComponent } from './components/user-circle/user-circle.component';
import { MemoryModalComponent } from './components/memory-modal/memory-modal.component';

//// OTHER
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'vertical',
  slidesPerView: 1,
  keyboard: true,
  mousewheel: false,
  scrollbar: false,
  pagination: false,
  navigation: false
};

@NgModule({
  declarations: [
    ShowComponent,
    TellComponent,
    LoginComponent,
    ShellComponent,
    AppComponent,
    RegisterComponent,
    UploadComponent,
    FileSizePipe,
    LoadingComponent,
    AttributeComponent,
    UserCardComponent,
    UserCircleComponent,
    MemoryModalComponent
  ],
  imports: [
    // ANGULAR
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    // NGRX
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AuthEffects, AboutEffects, UserEffects]),
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
    MatSnackBarModule,
    MatDialogModule,
    // 3RD PARTY
    SwiperModule
  ],
  providers: [
    AngularFirestore,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  entryComponents: [MemoryModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
