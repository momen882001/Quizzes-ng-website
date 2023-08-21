import { CreateQuestionService } from './service/create-questions.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit {
  validateForm!: FormGroup;
  levelId!: string;

  constructor(
    private fb: FormBuilder,
    private questionService: CreateQuestionService,
    private route: ActivatedRoute
  ) {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      questions: ['', [Validators.required]],
      isCorrect: [null],
      skillName: ['', [Validators.required]],
      answersList: new FormArray([]),
      description: ['',[Validators.required]],
      // newForm: new FormArray([], Validators.required),
    });
  }

  ngOnInit(): void {
    (<FormArray>this.validateForm.get('answersList')).push(
      new FormGroup({
        answer: new FormControl('', Validators.required),
        isCorrect: new FormControl(null),
      })
    );
    this.route.params.subscribe((params: Params) => {
      this.levelId = params['levelId'];
    });
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
        isCorrect: new FormControl(null),
      })
    );
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const title = this.validateForm.value.title;
      const description = this.validateForm.value.description;
      const questions = this.validateForm.value.questions;
      const skillName = this.validateForm.value.skillName;
      const answersList = this.validateForm.value.answersList;
      this.questionService.createQuestion(
        title,
        description,
        questions,
        skillName,
        this.levelId,
        answersList,
      );
      this.validateForm.reset();
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
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
