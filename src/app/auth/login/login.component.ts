import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {createLoginValidator} from "../../core/validators/auth/login-validators";
import {LoginRequest} from "../../core/models/auth/login-request.model";
import {AuthActions} from "../../core/stores/auth/auth.actions";
import {selectAuthError} from "../../core/stores/auth/auth.selectors";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  errorMessage: string = '';
  constructor(private store:Store, private fb: FormBuilder) {
  }
  ngOnInit() {
    this.loginForm = createLoginValidator(this.fb);
    this.store.pipe(select(selectAuthError)).subscribe(error => {
      this.errorMessage = error || '';
    });
  }
  onSubmit() {
    const formValues = this.loginForm.getRawValue();
    const login : LoginRequest = {
      email : formValues.email,
      password: formValues.password,
    }
    this.store.dispatch(AuthActions.loginUser({ login }));
  }
}
