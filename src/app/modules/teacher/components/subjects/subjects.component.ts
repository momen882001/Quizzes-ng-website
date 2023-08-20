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
  subjects!: { id: string; name: string }[];
  editMode: boolean = false;
  subjectId!: string;

  constructor(
    private fb: UntypedFormBuilder,
    private subjectsService: SubjectsService
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.editMode) {
        const updatedSubjectName = this.validateForm.value.name
        this.subjectsService.updateSubject(
          this.subjectId,
          updatedSubjectName
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

  onSubjectEdit(id: string, subjectName: string) {
    this.createSubjectFlag = true;
    this.editMode = true;
    this.validateForm.setValue({
      name: subjectName,
    });
    this.subjectId = id;
    console.log(this.subjectId);
  }

  cancel(): void {
    // this.nzMessageService.info('click cancel');
  }

  confirm(id: string): void {
    this.subjectsService.deleteSubject(id);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: ['', Validators.required],
    });
    this.loadSubjects();
  }

  private loadSubjects() {
    this.subjectsService.getSubjects().subscribe(
      (res: any) => {
        console.log(res.data);
        this.subjects = res.data;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
