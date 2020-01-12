import { Component, OnInit } from '@angular/core';
import { Hero } from '../../modules/heroes/shared/hero.model';
import { HeroService } from '../../modules/heroes/shared/hero.service';
import { AppConfig } from '../../configs/app.config';
import { Observable } from 'rxjs';
import { defaultIfEmpty, map } from 'rxjs/operators';
import { SchoolService, Student } from '../../shared/services/School.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss']
})

export class StudentPageComponent implements OnInit {
  students: Student[];
  studentDetail: Student;
  registerForm: FormGroup;
  submitted = false;

  constructor(private schoolService: SchoolService, private formBuilder: FormBuilder) {
    this.studentDetail = new Student();
   
  }
  get f() { return this.registerForm.controls; }


  ngOnInit() {
    //this.student = this.schoolService.getAllStundets();
    //console.log(this.student);
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      std: ['', [Validators.required]],
    });
    this.getStudentList();

  }

  getStudentList() {
    this.schoolService.getAllStundets().subscribe((res: any[]) => {
      this.students = res;
    });;
  }


  editStudent(studentId) {
    this.schoolService.getStudentDetail(studentId).subscribe((res: any) => {
      this.studentDetail = res;
      $("#basicExampleModal").modal('show');
    });;
  }


  deleteStudent(id) {
    this.schoolService.deleteSrudent(id).subscribe((res: any) => {
      this.getStudentList();
    });;

  }
  newStudent() {
    this.studentDetail = new Student();
    this.registerForm.reset();

    $("#basicExampleModal").modal('show');
  }

  closeModal() {
    this.submitted = false;
    this.registerForm.reset();
    $("#basicExampleModal").modal('hide');
    this.studentDetail = new Student();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    if (this.studentDetail.studentId == 0) {
      this.schoolService.saveStudent(this.studentDetail).subscribe((res: any) => {
        this.studentDetail = res;
        this.closeModal();
        this.getStudentList();
        this.submitted = false;

      });
    }
    else {
      this.schoolService.updateStudent(this.studentDetail).subscribe((res: any) => {
        //this.studentDetail = res;
        this.closeModal();
        this.getStudentList()
      });;
    }
   
  }

  onReset() {
    this.submitted = false;
    this.closeModal();
    this.registerForm.reset();

  }

}
