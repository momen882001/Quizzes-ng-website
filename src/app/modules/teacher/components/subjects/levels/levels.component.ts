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
  levels!: {id : string, name : string}[];
  editMode: boolean = false;
  levelId!: string;
  subjectId!: string;

  constructor(
    private fb: UntypedFormBuilder,
    private levelsService: LevelsService,
    private route: ActivatedRoute
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.editMode) {
        const updatedLevelName = this.validateForm.value.name
        this.levelsService.updateLevel(
          this.levelId,
          updatedLevelName
        );
        this.editMode = false;
      } else {
        const levelName = this.validateForm.value.name
        this.levelsService.addLevel(this.subjectId, levelName);
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

  onLevelEdit(id: string, levelName: string) {
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

  confirm(id: string): void {
    this.levelsService.deleteLevel(id);
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.route.params.subscribe((params: Params) => {
      this.subjectId = params['subjectId'];
      console.log(this.subjectId);
      this.levelsService.getLevels(this.subjectId).subscribe(
        (res: any) => {
          console.log(res.data);
          this.levels = res.data;
        },
        (err: any) => {
          console.log(err);
        }
      );
    });
  }
}
