import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../core/stores/auth/auth.actions';
import { ResetPassword } from '../../core/models/auth/reset-password.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPassForm!: FormGroup;
  token!: string | null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.resetPassForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.resetPassForm.invalid || !this.token) {
      this.errorMessage = "Le token est invalide ou le mot de passe ne respecte pas les règles.";
      return;
    }

    const resetData: ResetPassword = {
      token: this.token,
      newPassword: this.resetPassForm.getRawValue().newPassword
    };

 console.log(resetData);
    this.store.dispatch(AuthActions.resetPassword({ user: resetData }));
    this.successMessage = "Votre mot de passe a été réinitialisé avec succès.";

  }
}
