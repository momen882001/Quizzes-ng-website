import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ValidationErrors,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  validateForm!: FormGroup;

  ngOnInit(): void {
    (<FormArray>this.validateForm.get('wrongAnswers')).push(
      new FormGroup({
        wrongAnswer: new FormControl('', Validators.required),
      })
    );
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  getControls() {
    return (this.validateForm.get('wrongAnswers') as FormArray).controls;
  }

  removeField(index: number) {
    (<FormArray>this.validateForm.get('wrongAnswers')).removeAt(index);
  }

  addField() {
    (<FormArray>this.validateForm.get('wrongAnswers')).push(
      new FormGroup({
        wrongAnswer: new FormControl('', Validators.required),
      })
    );
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      quesTitle: ['', [Validators.required]],
      question: ['', [Validators.required]],
      rightAnswer: ['', [Validators.required]],
      wrongAnswers: new FormArray([], Validators.required),
      description: [''],
    });
  }
}
