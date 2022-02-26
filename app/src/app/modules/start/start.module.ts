import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartRoutingModule } from './start-routing.module';
import { StartComponent } from './start.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StartComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    StartRoutingModule,
    ReactiveFormsModule
  ]
})
export class StartModule { }
