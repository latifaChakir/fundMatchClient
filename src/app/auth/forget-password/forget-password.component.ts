import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forgetPassValidator } from "../../core/validators/forgetpass-validators";
import { Store } from "@ngrx/store";
import { AuthActions } from "../../core/stores/auth/auth.actions";
import { ForgetPassword } from "../../core/models/forget-password.model";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPassForm!: FormGroup;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.forgetPassForm = forgetPassValidator(this.fb);
  }

  onSubmit() {
    const formValues = this.forgetPassForm.getRawValue();
    const forgetPass: ForgetPassword = {
      email: formValues.email,
    };

    this.store.dispatch(AuthActions.forgetPassword({ user: forgetPass }));

    // Afficher le message de succès et vider l'input
    this.successMessage = "Un email de réinitialisation a été envoyé avec succès.";
    this.forgetPassForm.reset(); // Réinitialiser le formulaire
  }
}
