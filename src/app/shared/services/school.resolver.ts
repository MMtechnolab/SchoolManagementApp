import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Student } from './school.service';
import { Observable } from 'rxjs';
import { SchoolService } from './school.service';

@Injectable()
export class SchoolResolver implements Resolve<Observable<Student>> {
  constructor(private schoolService: SchoolService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.schoolService.getStudentDetail(parseInt(route.paramMap.get('id')));
  }
}
