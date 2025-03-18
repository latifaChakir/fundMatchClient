// register.component.ts
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {createRegisterValidator} from "../../core/validators/auth/register-validators";
import {AuthActions} from "../../core/stores/auth/auth.actions";
import {RegisterRequest} from "../../core/models/auth/Register-request.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  showRoleSelection = false;
  selectedRole = 2;

  constructor(private store: Store, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.registerForm = createRegisterValidator(this.fb);
  }

  onRegisterClick() {
    if (this.registerForm.valid) {
      this.showRoleSelection = true;
    }
  }

  onSubmit() {
    if (!this.showRoleSelection) {
      this.showRoleSelection = true;
      return;
    }

    const formValues = this.registerForm.getRawValue();
    const user: RegisterRequest = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      password: formValues.password,
      phoneNumber: formValues.phoneNumber,
      isActive: true,
      roles: [this.selectedRole]
    }
    this.store.dispatch(AuthActions.registerUser({ user }))
  }

  selectRole(roleId: number) {
    this.selectedRole = roleId;
  }

  goBack() {
    this.showRoleSelection = false;
  }
}
