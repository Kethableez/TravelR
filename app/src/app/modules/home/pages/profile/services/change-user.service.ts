import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { reverse } from "lodash-es";
import { map } from "rxjs";
import { AppState } from "src/app/core/store/app.states";
import { selectUser, UserActions } from "../../../store/user";

@Injectable({
  providedIn: 'root'
})
export class ChangeUserService {

  user$ = this.store$.select(selectUser);

  constructor(private store$: Store<AppState>) { }

  parseDate(rawDate: string) {
    return reverse(new Date(rawDate).toLocaleString().split(',')[0].split('.')).join('-');
  }

  submitForm(changeForm: any) {
    this.store$.dispatch(UserActions.editUser({ data: changeForm }));
  }


}
