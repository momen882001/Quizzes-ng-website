import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  validateForm!: FormGroup;

  ngOnInit(): void {
    (<FormArray>this.validateForm.get('answersList')).push(
      new FormGroup({
        answer: new FormControl('', Validators.required),
        isCorrect: new FormControl(null, Validators.required),
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
    return (this.validateForm.get('answersList') as FormArray).controls;
  }


  removeField(index: number) {
    (<FormArray>this.validateForm.get('answersList')).removeAt(index);
  }

  addField() {
    (<FormArray>this.validateForm.get('answersList')).push(
      new FormGroup({
        answer: new FormControl('', Validators.required),
        isCorrect: new FormControl(null, Validators.required),
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
      title: ['', [Validators.required]],
      question: ['', [Validators.required]],
      isCorrect: [null, [Validators.required]],
      answersList: new FormArray([], Validators.required),
      description: [''],
      // newForm: new FormArray([], Validators.required),
    });
  }


  // Add question in the same component

  // getFormControls() {
  //   return (this.validateForm.get('newForm') as FormArray).controls;
  // }

  // addForm() {
  //   (<FormArray>this.validateForm.get('newForm')).push(
  //     new FormGroup({
  //       wrongAnswer: new FormControl('', Validators.required),
  //       quesTitle: new FormControl('', [Validators.required]),
  //       question: new FormControl('', [Validators.required]),
  //       rightAnswer: new FormControl('', [Validators.required]),
  //       wrongAnswers: new FormArray([], Validators.required),
  //       description: new FormControl(''),
  //     })
  //   );
  // }
}
