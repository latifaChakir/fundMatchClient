import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Stage} from "../../models/stage/stage.model";

@Injectable({
  providedIn: 'root'
})
export class StageService {
  private api = `${environment.apiUrl}/stages`;

  constructor(private http: HttpClient) { }
  saveStage(Stage: Stage): Observable<Stage> {
    return this.http.post<{ data:Stage }>(`${this.api}/save`, Stage).pipe(
      map(response => response.data)
    );
  }
  getStages(): Observable<Stage[]> {
    return this.http.get<{ data: Stage[] }>(this.api).pipe(
      map(response => response.data)
    );
  }
  deleteStage(StageId: number) {
    return this.http.delete(`${this.api}/${StageId}`);
  }

  updateStage(Stage: Stage, StageId: number): Observable<Stage> {
    return this.http.put<{ data: Stage }>(`${this.api}/${StageId}`, Stage).pipe(
      map(response => response.data)
    );
  }
  getStageById(StageId: number): Observable<Stage> {
    return this.http.get<{ data: Stage }>(`${this.api}/${StageId}`).pipe(
      map(response => response.data)
    );
  }
}
