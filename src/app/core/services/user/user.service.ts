import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../../models/user/user.model";
import {UserRequest} from "../../models/user/userRequest.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {
  }
  getUsers(): Observable<User[]> {
    return this.http.get<{ data: User[] }>(`${this.api}/all`).pipe(
      map(response => response.data)
    );
  }
  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.api}/me`).pipe()
  }
  updateProfile(user: UserRequest): Observable<User> {
    return this.http.put<User>(`${this.api}/updateMyInfo`, user);
  }

  blockUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.api}/block/${userId}`);
  }
  unBlockUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.api}/unBlock/${userId}`);
  }




}
