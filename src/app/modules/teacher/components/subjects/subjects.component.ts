import { Component, OnInit } from '@angular/core';
import {
  NgForm,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SubjectsService } from './subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  createSubjectFlag : boolean = false;

  constructor(private fb: UntypedFormBuilder, private subjectsService : SubjectsService) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log(this.validateForm.value);
      this.subjectsService.addSubject(this.validateForm.value)
      this.validateForm.reset();
      this.createSubjectFlag = false
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

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      subject: ['', Validators.required],
    });
  }
}
