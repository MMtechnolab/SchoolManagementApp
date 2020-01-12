import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Error404PageComponent} from './pages/error404-page/error404-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import { StudentPageComponent} from './pages/student-page/student-page.component';
import { RoutesConfig } from './configs/routes.config';
import { SchoolResolver } from './shared/services/school.resolver';
import { SchoolService} from './shared/services/school.service';
import { AdalGuard } from 'adal-angular4';
import { AuthCallbackComponent } from './authcallback.component';

const routesNames = RoutesConfig.routesNames;

const routes: Routes = [
  { path: routesNames.home, component: HomePageComponent, pathMatch: 'full'},
  { path: routesNames.student, component: StudentPageComponent, pathMatch: 'full'},
  { path: routesNames.heroes.basePath, loadChildren: () => import('./modules/heroes/heroes.module').then(m => m.HeroesModule)},
  { path: routesNames.error404, component: Error404PageComponent},
  { path: 'en', redirectTo: ''}, // because english language is the default one

  // otherwise redirect to 404
  { path: '**', redirectTo: RoutesConfig.routes.error404},
  { path: 'auth-callback', component: AuthCallbackComponent },



  //{ path: routesNames.home, component: HomePageComponent, pathMatch: 'full', canActivate: [AdalGuard] },
  //{ path: routesNames.student, component: StudentPageComponent, pathMatch: 'full', canActivate: [AdalGuard] },
  //{ path: routesNames.heroes.basePath, loadChildren: () => import('./modules/heroes/heroes.module').then(m => m.HeroesModule), canActivate: [AdalGuard] },
  //{ path: routesNames.error404, component: Error404PageComponent, canActivate: [AdalGuard] },
  //{ path: 'en', redirectTo: '', canActivate: [AdalGuard] }, // because english language is the default one

  //// otherwise redirect to 404
  //{ path: '**', redirectTo: RoutesConfig.routes.error404, canActivate: [AdalGuard] },
  //{ path: 'auth-callback', component: AuthCallbackComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SchoolResolver,
    SchoolService
  ]
})

export class AppRoutingModule {
}
