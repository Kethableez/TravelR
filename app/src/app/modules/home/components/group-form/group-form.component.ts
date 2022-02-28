import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { FileSelector } from 'src/app/core/models/enums/file-selector.model';
import { FileService } from 'src/app/core/services/file.service';
import { AppState } from 'src/app/core/store/app.states';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  constructor(
    private store$: Store<AppState>,
    private builder: FormBuilder,
    private fileService: FileService
  ) { }

  file?: File;
  selector: FileSelector = FileSelector.GROUP;

  groupForm = this.builder.group({
    name: ['', Validators.required],
    coverPhotoRef: ['group/default.jpg', Validators.required]
  })

  ngOnInit(): void {
  }

  attachFile(event: any) {
    this.file = event.target.files[0];
  }

  submitForm() {
    const file = new FormData();
    if (this.file) {
      file.append('file', this.file);
    }

    this.fileService.uploadFile(file, this.selector).pipe(
      tap((response) => {
        const filename = response.filename;
        this.groupForm.patchValue({
          coverPhotoRef: [this.selector, filename].join('/')
        })
        const data = this.groupForm.value;
      })
    ).subscribe();
  }

}
