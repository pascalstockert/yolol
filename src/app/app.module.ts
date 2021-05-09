import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {PrismicDOMPipe} from './components/pipes/prismic-pipe/prismic-dom.pipe';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Angular Material Components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatRippleModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './components/page/page.component';
import { HeaderSliceComponent } from './sections/header-slice/header-slice.component';
import { HeaderCardComponent } from './sections/header-card/header-card.component';
import { CollapsiblesComponent } from './sections/collapsibles/collapsibles.component';
import { FooterComponent } from './components/footer/footer.component';
import { WindowScrollService } from './services/window-scroll.service';
import { QuoteComponent } from './sections/quote/quote.component';
import { TextComponent } from './sections/text/text.component';
import { PageButtonsComponent } from './sections/page-buttons/page-buttons.component';
import { PictureComponent } from './sections/picture/picture.component';
import { ScrollTopButtonComponent } from './components/scroll-top-button/scroll-top-button.component';
import { MenuComponent } from './sections/menu/menu.component';
import { CodePipe } from './components/pipes/code-pipe/code.pipe';
import { CookieNoticeComponent } from './components/cookie-notice/cookie-notice.component';
import { PrismicDOMtextPipe } from './components/pipes/prismic-pipe/prismic-domtext.pipe';
import { EditorComponent } from './components/editor/editor.component';
import { DarkmodeService } from './services/darkmode.service';
import { LandingHeroComponent } from './sections/landing-hero/landing-hero.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    HeaderSliceComponent,
    PrismicDOMPipe,
    HeaderCardComponent,
    CollapsiblesComponent,
    FooterComponent,
    QuoteComponent,
    TextComponent,
    PageButtonsComponent,
    PictureComponent,
    ScrollTopButtonComponent,
    MenuComponent,
    CodePipe,
    CookieNoticeComponent,
    PrismicDOMtextPipe,
    EditorComponent,
    LandingHeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FontAwesomeModule,
    MatRippleModule
  ],
  providers: [WindowScrollService],
  bootstrap: [AppComponent]
})
export class AppModule { }
