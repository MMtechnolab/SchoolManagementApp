import {InjectionToken} from '@angular/core';

export let ROUTES_CONFIG = new InjectionToken('routes.config');

const basePaths = {
  heroes: 'heroes',
};

const routesNames = {
  home: '',
  error404: '404',
  student:'student',
  heroes: {
    basePath: basePaths.heroes
  }
};

export const RoutesConfig: any = {
  routesNames,
  routes: {
    home: `/${routesNames.home}`,
    error404: `/${routesNames.error404}`,
    heroes: {
      detail: getHeroDetail
    }
  }
};

export function getHeroDetail(id) {
  return `/${basePaths.heroes}/${id}`;
}
