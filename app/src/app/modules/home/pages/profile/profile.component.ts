import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { omit } from '@ngrx/store/src/utils';
import { isArray, omitBy, reverse } from 'lodash-es';
import { map, Subscription, tap } from 'rxjs';
import { AbstractCleanable } from 'src/app/core/abstract-cleanable.directive';
import { User } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/core/store/app.states';
import { selectUser, UserActions } from '../../store/user';
import { ChangeUserService } from './services/change-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends AbstractCleanable implements OnInit  {
  constructor(
    private store$: Store<AppState>,
    private changeUserService: ChangeUserService,
    private builder: FormBuilder
    ) {
      super();
    }

  isFormInited: boolean = false;
  user!: any;

  editForm = this.builder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthdate: ['', Validators.required],
    avatarRef: ['', Validators.required],
  });

  ngOnInit(): void {
    this.addSubscription(this.initForm().subscribe());
  }

  initForm() {
    return this.changeUserService.user$.pipe(
      tap((user) => {
        this.editForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          birthdate: this.changeUserService.parseDate(user.birthdate),
          avatarRef: user.avatarRef,
        });
        this.isFormInited = true;
      })
    )
  }


  change() {
    const changeForm = this.editForm.value;
    this.changeUserService.submitForm(changeForm);
  }
}
