import {Component, Inject, LOCALE_ID, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UtilsHelperService} from './shared/services/utils-helper.service';
import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {RoutesConfig} from './configs/routes.config';
import { AdalService } from 'adal-angular4';

declare const Modernizr;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {

  isOnline: boolean;

  private adalConfiguration = {
    tenant: '1309fd06-3b6a-48d2-99ea-1b8e208ba947',
    clientId: 'fd7009c7-9391-4921-a945-b79b220e962b',
    redirectUri: 'http://localhost:4200/auth-callback',
    postLogoutRedirectUri: 'http://localhost:4200/logout',
    endpoints: {
      'WEB_API_URL': 'api://fd7009c7-9391-4921-a945-b79b220e962b/api-access'
    }
  }

  constructor(private title: Title,
              private meta: Meta,
              private snackBar: MatSnackBar,
              private router: Router,
              private i18n: I18n,
              private renderer: Renderer2,
              @Inject(DOCUMENT) doc: Document,
              @Inject(LOCALE_ID) locale: string,
    @Inject(PLATFORM_ID) private platformId: object,
    private adal: AdalService) {
    if (isPlatformBrowser(this.platformId)) {
      this.isOnline = navigator.onLine;
      renderer.setAttribute(doc.documentElement, 'lang', locale);
    } else {
      this.isOnline = true;
    }
    this.adal.init(this.adalConfiguration);

  }

  ngOnInit() {
    this.title.setTitle(this.i18n({value: 'App title', id: '@@appTitle'}));

    this.onEvents();
    this.checkBrowser();
  }

  onEvents() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        switch (event.urlAfterRedirects) {
          case '/':
            this.meta.updateTag({
              name: 'description',
              content: this.i18n({value: 'Home meta description', id: '@@homeMetaDescription'})
            });
            break;
          case '/' + RoutesConfig.routesNames.heroes.basePath:
            this.title.setTitle('Heroes list');
            this.meta.updateTag({
              name: 'description',
              content: this.i18n({value: 'Heroes meta description', id: '@@heroesMetaDescription'})
            });
            break;
        }
      }
    });
  }

  checkBrowser() {
    if (isPlatformBrowser(this.platformId)) {
      if (UtilsHelperService.isBrowserValid()) {
        this.checkBrowserFeatures();
      } else {
        this.snackBar.open(this.i18n({value: 'Change your browser', id: '@@changeBrowser'}), 'OK');
      }
    }
  }

  checkBrowserFeatures() {
    let supported = true;
    for (const feature in Modernizr) {
      if (Modernizr.hasOwnProperty(feature) &&
        typeof Modernizr[feature] === 'boolean' && Modernizr[feature] === false) {
        supported = false;
        break;
      }
    }

    if (!supported) {
      this.snackBar.open(this.i18n({value: 'Update your browser', id: '@@updateBrowser'}), 'OK');
    }

    return supported;
  }
}
