import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Event} from "../../models/event/event.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private api = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) { }

  likeStartup(startupId: number): Observable<any> {
    return this.http.post<any>(`${this.api}/${startupId}/like`, {});
  }

  addComment(startupId: number, comment: { content: string }): Observable<any> {
    return this.http.post<any>(`${this.api}/${startupId}/comment`, comment);
  }
  getLikes(startupId: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${startupId}/likes`);
  }
  getComments(startupId: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${startupId}/comments`);

  }
}
