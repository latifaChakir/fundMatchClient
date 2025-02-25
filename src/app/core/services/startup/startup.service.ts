import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Startup} from "../../models/startup/startup.model";

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  private api = `${environment.apiUrl}/startups`;

  constructor(private http: HttpClient) { }
  saveStartup(Startup: Startup): Observable<Startup> {
    return this.http.post<{ data:Startup }>(`${this.api}/save`, Startup).pipe(
      map(response => response.data)
    );
  }
  getStartups(): Observable<Startup[]> {
    return this.http.get<{ data: Startup[] }>(this.api).pipe(
      map(response => response.data)
    );
  }
  deleteStartup(StartupId: number) {
    return this.http.delete(`${this.api}/${StartupId}`);
  }

  updateStartup(Startup: Startup, StartupId: number): Observable<Startup> {
    return this.http.put<{ data: Startup }>(`${this.api}/${StartupId}`, Startup).pipe(
      map(response => response.data)
    );
  }
  getStartupById(StartupId: number): Observable<Startup> {
    return this.http.get<{ data: Startup }>(`${this.api}/${StartupId}`).pipe(
      map(response => response.data)
    );
  }
}
