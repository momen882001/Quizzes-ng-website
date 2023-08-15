import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SubjectsService } from '../service/subjects.service';
import { LevelsService } from './service/levels.service';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css'],
})
export class LevelsComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  createSubjectFlag: boolean = false;
  subjects!: any[];
  editMode: boolean = false;
  subjectId!: number;

  constructor(
    private fb: UntypedFormBuilder,
    private subjectsService: SubjectsService,
    private levelsService : LevelsService
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.editMode) {
        console.log(this.validateForm.value);
        this.subjectsService.updateSubject(
          this.subjectId,
          this.validateForm.value
        );
        this.editMode = false;
      } else {
        this.levelsService.addLevel( 1 ,this.validateForm.value);
        console.log(this.validateForm.value);
      }
      this.validateForm.reset();
      this.createSubjectFlag = false;
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onCreatelevel() {
    this.createSubjectFlag = true;
  }

  // onSubjectEdit(id: number, subjectName: string) {
  //   this.createSubjectFlag = true;
  //   this.editMode = true;
  //   this.validateForm.setValue({
  //     subject: subjectName,
  //   });
  //   this.subjectId = id;
  //   console.log(this.subjectId);
  // }

  // onSubjectDelete(id: number) {
  //   this.subjectsService.deleteSubject(id);
  // }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      levelName: ['', Validators.required],
    });
    // this.loadSubjects();
  }

  // private loadSubjects() {
  //   this.subjectsService.getSubjects().subscribe(
  //     (res: any) => {
  //       console.log(res);
  //       this.subjects = res;
  //     },
  //     (err: any) => {
  //       console.log(err);
  //     }
  //   );
  // }
}
