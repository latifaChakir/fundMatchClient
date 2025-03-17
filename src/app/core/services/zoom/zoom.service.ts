import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ZoomService {
  private api = `${environment.apiUrl}/zoom`;

  constructor(private http: HttpClient) {
  }
  createMeeting(topic: string) {
    return this.http.post(`${this.api}/create-meeting`, { topic });
  }


}
