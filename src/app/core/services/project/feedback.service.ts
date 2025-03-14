import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Feedback} from "../../models/project/feedback.model";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private api = `${environment.apiUrl}/feedbacks`;

  constructor(private http: HttpClient) { }
  addFeedback(projectId: number, feedback : Feedback): Observable<any> {
    return this.http.post<any>(`${this.api}/project/${projectId}`, feedback);
  }

}
