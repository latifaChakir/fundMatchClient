import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {LoginRequest} from "../../models/login-request.model";
import {RegisterRequest} from "../../models/Register-request.model";
import {RegisterResponse} from "../../models/register-response.interface";
import {LoginResponse} from "../../models/login-response.model";
import {ForgetPassword} from "../../models/forget-password.model";
import {ResetPassword} from "../../models/reset-password.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.api}/login`, request).pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }


  register(user: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.api}/register`, user);
  }

  forgetPassword(user: ForgetPassword): Observable<void> {
    return this.http.post<void>(`${this.api}/forgot-password`, user);
  }

  resetPassword(user: ResetPassword): Observable<void> {
    return this.http.post<void>(`${this.api}/reset-password`, user);
  }
}
