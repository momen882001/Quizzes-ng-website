import { Component, OnInit } from '@angular/core';
import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SubjectsService } from './service/subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  createSubjectFlag: boolean = false;
  subjects!: any[];
  editMode: boolean = false;
  subjectId!: number;
  nzMessageService: any;

  constructor(
    private fb: UntypedFormBuilder,
    private subjectsService: SubjectsService
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
        this.subjectsService.addSubject(this.validateForm.value);
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

  onCreateSubject() {
    this.createSubjectFlag = true;
  }

  onSubjectEdit(id: number, subjectName: string) {
    this.createSubjectFlag = true;
    this.editMode = true;
    this.validateForm.setValue({
      subject: subjectName,
    });
    this.subjectId = id;
    console.log(this.subjectId);
  }

  onSubjectDelete(id: number) {
    this.confirm(id)
  }

  cancel(): void {
    // this.nzMessageService.info('click cancel');
  }

  confirm(id : number): void {
    this.subjectsService.deleteSubject(id);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      subject: ['', Validators.required],
    });
    this.loadSubjects();
  }

  private loadSubjects() {
    this.subjectsService.getSubjects().subscribe(
      (res: any) => {
        console.log(res);
        this.subjects = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
