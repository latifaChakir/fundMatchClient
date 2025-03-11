import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private api = `${environment.apiUrl}/dashboard`;

  constructor(private http: HttpClient) { }
  getAllStatistics(): Observable<any> {
    return this.http.get<any>(`${this.api}/all`);
  }
}
