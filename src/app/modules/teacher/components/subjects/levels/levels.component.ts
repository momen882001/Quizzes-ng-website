import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { SubjectsService } from '../service/subjects.service';
import { LevelsService } from './service/levels.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css'],
})
export class LevelsComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  createLevelFlag: boolean = false;
  levels!: any[];
  editMode: boolean = false;
  levelId!: number;
  subjectId!: number;

  constructor(
    private fb: UntypedFormBuilder,
    private subjectsService: SubjectsService,
    private levelsService: LevelsService,
    private route: ActivatedRoute
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.editMode) {
        console.log(this.validateForm.value);
        this.levelsService.updateLevel(
          this.levelId,
          this.validateForm.value
        );
        this.editMode = false;
      } else {
        this.levelsService.addLevel(this.levelId, this.validateForm.value);
        console.log(this.validateForm.value);
      }
      this.validateForm.reset();
      this.createLevelFlag = false;
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
    this.createLevelFlag = true;
  }

  onLevelEdit(id: number, levelName: string) {
    this.createLevelFlag = true;
    this.editMode = true;
    this.validateForm.setValue({
      levelName: levelName,
    });
    this.levelId = id;
    console.log(this.levelId);
  }

  cancel(): void {
    // this.nzMessageService.info('click cancel');
  }

  confirm(id: number): void {
    this.levelsService.deleteLevel(id);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      levelName: ['', Validators.required],
    });

    this.route.params.subscribe((params: Params) => {
      this.subjectId = params['subjectId'];
      console.log(this.subjectId);
      this.levelsService.getLevels(this.subjectId).subscribe(
        (res: any) => {
          console.log(res);
          this.levels = res.levels;
        },
        (err: any) => {
          console.log(err);
        }
      );
    });
  }
}
