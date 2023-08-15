import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css'],
})
export class LevelComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  modeChange(value: string): void {
    if (value === 'CQ') {
      this.router.navigate(['createQues'], { relativeTo: this.route });
    } else if (value === 'CE') {
      this.router.navigate(['createExam'], { relativeTo: this.route });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      mode: ['', Validators.required],
    });
  }
}
