import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Meeting} from "../../models/meeting/meet.model";

@Injectable({
  providedIn: 'root'
})
export class ZoomService {
  private api = `${environment.apiUrl}/zoom`;

  constructor(private http: HttpClient) {
  }
  createMeeting(topic: string, startTime: string, duration: number, type: string) {
    return this.http.post(`${this.api}/create-meeting`, { topic, startTime, duration,type });
  }
  getMyMeetings():Observable<Meeting[]>{
    return this.http.get<Meeting[]>(`${this.api}/myMeetings`, {})
  }

}
