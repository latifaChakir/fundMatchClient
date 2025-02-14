import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {createRegisterValidator} from "../../core/validators/register-validators";
import {AuthActions} from "../../core/stores/auth/auth.actions";
import {RegisterRequest} from "../../core/models/Register-request.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  constructor(private store : Store,private fb: FormBuilder) {
  }
  ngOnInit() {
    this.registerForm = createRegisterValidator(this.fb);
  }

  onSubmit() {
    const formValues = this.registerForm.getRawValue();
    const user : RegisterRequest = {
      firstName : formValues.firstName,
      lastName : formValues.lastName,
      email : formValues.email,
      password : formValues.password,
      phoneNumber : formValues.phoneNumber,
      isActive : true,
      roles : [1]
    }
    this.store.dispatch(AuthActions.registerUser({ user }))
  }
}
