import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Investor} from "../../models/investor/investor.model";

@Injectable({
  providedIn: 'root'
})
export class InvestorService {
  private api = `${environment.apiUrl}/investors`;

  constructor(private http: HttpClient) { }
  saveInvestor(investor: Investor): Observable<Investor> {
    return this.http.post<{ data:Investor }>(`${this.api}/save`, investor).pipe(
      map(response => response.data)
    );
  }
  getInvestors(): Observable<Investor[]> {
    return this.http.get<{ data: Investor[] }>(this.api).pipe(
      map(response => response.data)
    );
  }
  deleteInvestor(investorId: number) {
    return this.http.delete(`${this.api}/${investorId}`);
  }

  updateInvestor(investor: Investor, investorId: number): Observable<Investor> {
    return this.http.put<{ data: Investor }>(`${this.api}/${investorId}`, investor).pipe(
      map(response => response.data)
    );
  }
  getInvestorById(investorId: number): Observable<Investor> {
    return this.http.get<{ data: Investor }>(`${this.api}/${investorId}`).pipe(
      map(response => response.data)
    );
  }
  bookProject(projectId : number) : Observable<any> {
    return this.http.get(`${this.api}/bookProject/${projectId}`);
  }
  loadBookedProjects(): Observable<any> {
    return this.http.get(`${this.api}/getBookProjectSaved`);
  }
  unSaveProject(projectId : number) : Observable<any> {
    return this.http.get(`${this.api}/unSaveProject/${projectId}`);
  }
  getInvestorByUser(): Observable<Investor> {
    return this.http.get<Investor>(`${this.api}/getInvestor`);
  }
}
