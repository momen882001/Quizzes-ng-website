import { Component } from '@angular/core';
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
export class QuestionsComponent {
  validateForm!: FormGroup;

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

  // addField(e?: MouseEvent): void {
  //   if (e) {
  //     e.preventDefault();
  //   }
  //   const id = this.listOfControl.length > 0 ? this.listOfControl[this.listOfControl.length - 1].id + 1 : 0;

  //   const control = {
  //     id,
  //     controlInstance: `passenger${id}`
  //   };
  //   const index = this.listOfControl.push(control);
  //   console.log(this.listOfControl[this.listOfControl.length - 1]);
  //   this.validateForm.addControl(
  //     this.listOfControl[index - 1].controlInstance,
  //     new FormControl(null, Validators.required)
  //   );
  // }

  // removeField(i: { id: number; controlInstance: string }, e: MouseEvent): void {
  //   e.preventDefault();
  //   if (this.listOfControl.length > 1) {
  //     const index = this.listOfControl.indexOf(i);
  //     this.listOfControl.splice(index, 1);
  //     console.log(this.listOfControl);
  //     this.validateForm.removeControl(i.controlInstance);
  //   }
  // }

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
      description: [''],
      wrongAnswers: new FormArray([], [Validators.required]),
    });
  }
}
