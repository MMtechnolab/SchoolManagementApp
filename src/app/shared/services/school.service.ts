import {Injectable} from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class SchoolService {
  myAppUrl: string;
  myApiUrl: string;
  student:any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.myApiUrl = environment.apiUrl1;
  }

  getAllStundets(): Observable<Student[]> {
    return this.http.get<Student[]>(environment.getAllStudents);
  }

  getStudentDetail(id: number): Observable<Student> {
    return this.http.get<Student>(environment.getDetailStudent+id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveStudent(student): Observable<Student> {
    return this.http.post<Student>(environment.AddStudent, JSON.stringify(student), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateStudent(student): Observable<Student> {
    return this.http.post<Student>(environment.UpdateStudent, JSON.stringify(student), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteSrudent(id: number): Observable<Student> {
    return this.http.delete<Student>(environment.DeleteStudent + id)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}


export class Student {
  studentId?: number= 0;
  name: string;
  age: number ;
  phoneNumber: string;
  std: string;
}
