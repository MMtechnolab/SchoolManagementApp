import { APP_INITIALIZER, ErrorHandler, LOCALE_ID, NgModule, PLATFORM_ID, TRANSLATIONS, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './modules/core/core.module';
import {AppComponent} from './app.component';
import {APP_CONFIG, AppConfig} from './configs/app.config';
import {SharedModule} from './shared/shared.module';
import {NgxExampleLibraryModule} from '@ismaestro/ngx-example-library';
import {FirebaseModule} from './shared/modules/firebase.module';
import {SentryErrorHandler} from './modules/core/sentry.errorhandler';
import {BrowserModule, ɵgetDOM} from '@angular/platform-browser';
import {I18n} from '@ngx-translate/i18n-polyfill';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {DOCUMENT, isPlatformBrowser, registerLocaleData} from '@angular/common';
import localeEs from '@angular/common/locales/es';
import {CookieModule} from 'ngx-cookie';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ROUTES_CONFIG, RoutesConfig} from './configs/routes.config';
import {HomePageComponent} from './pages/home-page/home-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { SchoolService } from './shared/services/school.service';
import {Error404PageComponent} from './pages/error404-page/error404-page.component';
import {ENDPOINTS_CONFIG, EndpointsConfig} from './configs/endpoints.config';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {RouterModule} from '@angular/router';
import { PrebootModule } from 'preboot';
import { AdalGuard } from 'adal-angular4';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthCallbackComponent } from './authcallback.component';
import { AdalService, AdalInterceptor } from 'adal-angular4';
 declare const require;
export const protectedResourceMap: [string, string[]][] = [['https://localhost:44377/api/values', ['api://fd7009c7-9391-4921-a945-b79b220e962b/api-access']]];	
registerLocaleData(localeEs, 'es');


export function appInitializer(document: HTMLDocument, platformId: object) {
  return () => {
    if (isPlatformBrowser(platformId)) {
      const dom = ɵgetDOM();
      const styles: any[] = Array.prototype.slice.apply(dom.querySelectorAll(document, `style[ng-transition]`));
      styles.forEach(el => {
        // Remove ng-transition attribute to prevent Angular appInitializerFactory
        // to remove server styles before preboot complete
        el.removeAttribute('ng-transition');
      });
      document.addEventListener('PrebootComplete', () => {
        // After preboot complete, remove the server scripts
        setTimeout(() => styles.forEach(el => dom.remove(el)));
      });
    }
  };
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'angularexampleapp'}),
    PrebootModule.withConfig({appRoot: 'app-root'}),
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    FirebaseModule,
    FormsModule,
    ReactiveFormsModule,

    NgxExampleLibraryModule.forRoot({
      config: {
        say: 'hello'
      }
    }),
    //MsalModule.forRoot({
    //  clientID: 'fd7009c7-9391-4921-a945-b79b220e962b',
    //  authority: 'https://login.microsoftonline.com/160c697c-1fc7-465c-9187-67e7080382bb',
    //  consentScopes: ["user.read", "api://fd7009c7-9391-4921-a945-b79b220e962b/api-access"],
    //  protectedResourceMap: protectedResourceMap
    //}),
    LazyLoadImageModule.forRoot({}),
    CoreModule,
    SharedModule,
  ],
  declarations: [
    HomePageComponent,
    StudentPageComponent,
    Error404PageComponent,
    AuthCallbackComponent,
    AppComponent
  ],
  providers: [
    SchoolService,
    AdalService,
    AdalGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AdalInterceptor, multi: true },
    {provide: APP_CONFIG, useValue: AppConfig},
    {provide: ROUTES_CONFIG, useValue: RoutesConfig},
    {provide: ENDPOINTS_CONFIG, useValue: EndpointsConfig},
    {provide: ErrorHandler, useClass: SentryErrorHandler},
    {
      provide: TRANSLATIONS,
      useFactory: (locale) => {
        locale = locale || 'en';
        return require(`raw-loader!../i18n/messages.${locale}.xlf`);
      },
      deps: [LOCALE_ID]
    },
    I18n,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [DOCUMENT, PLATFORM_ID],
      multi: true
    },
    //{ provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true }
  ]
})

export class AppModule {
}
