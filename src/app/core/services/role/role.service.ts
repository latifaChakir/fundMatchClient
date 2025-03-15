import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Role} from "../../models/auth/Register-request.model";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private api = `${environment.apiUrl}/roles`;

  constructor(private http: HttpClient) { }
  saveRole(role: Role): Observable<Role> {
    return this.http.post<{ data:Role }>(`${this.api}/save`, role).pipe(
      map(response => response.data)
    );
  }
  getRoles(): Observable<Role[]> {
    return this.http.get<{ data: Role[] }>(this.api).pipe(
      map(response => response.data)
    );
  }
  deleteRole(roleId: number) {
    return this.http.delete(`${this.api}/${roleId}`);
  }

  updateRole(role: Role, roleId: number): Observable<Role> {
    return this.http.put<{ data: Role }>(`${this.api}/${roleId}`, role).pipe(
      map(response => response.data)
    );
  }
  getRoleById(roleId: number): Observable<Role> {
    return this.http.get<{ data: Role }>(`${this.api}/${roleId}`).pipe(
      map(response => response.data)
    );
  }
}
