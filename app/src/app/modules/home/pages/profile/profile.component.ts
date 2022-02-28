import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { omit } from '@ngrx/store/src/utils';
import { isArray, omitBy, reverse } from 'lodash-es';
import { map, tap } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AppState } from 'src/app/core/store/app.states';
import { selectUser, UserActions } from '../../store/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private store$: Store<AppState>, private builder: FormBuilder) {}

  isFormInited: boolean = false;
  user!: any;

  editForm = this.builder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    birthdate: ['', Validators.required],
    avatarRef: ['', Validators.required],
  });

  ngOnInit(): void {
    this.initForm().subscribe();
  }

  initForm() {
    return this.store$.select(selectUser).pipe(
      tap((user) => {
        this.editForm.patchValue({
          firstName: user?.firstName,
          lastName: user?.lastName,
          birthdate: this.parseDate(user!.birthdate),
          avatarRef: user?.avatarRef,
        });
        this.user = user;
        this.isFormInited = true;
      })
    );
  }

  parseDate(rawDate: string) {
    return reverse(
      new Date(rawDate).toLocaleString().split(',')[0].split('.')
    ).join('-');
  }

  change() {
    this.store$.dispatch(UserActions.editUser( this.editForm.value ));
  }

  changedUser() {
    const user: User = {
      ...this.user,
      ...this.editForm.value
    }

    return user;
  }
}
