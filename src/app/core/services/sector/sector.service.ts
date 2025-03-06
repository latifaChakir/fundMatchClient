import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Sector} from "../../models/sector/sector.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  private api = `${environment.apiUrl}/sectors`;

  constructor(private http: HttpClient) { }
  saveSector(sector: Sector): Observable<Sector> {
    return this.http.post<{ data:Sector }>(`${this.api}/save`, sector).pipe(
      map(response => response.data)
    );
  }
  getSectors(): Observable<Sector[]> {
    return this.http.get<{ data: Sector[] }>(`${this.api}/all`).pipe(
      map(response => response.data)
    );
  }
  deleteSector(sectorId: number) {
    return this.http.delete(`${this.api}/${sectorId}`);
  }

  updateSector(sector: Sector, sectorId: number): Observable<Sector> {
    return this.http.put<{ data: Sector }>(`${this.api}/${sectorId}`, sector).pipe(
      map(response => response.data)
    );
  }
  getSectorById(sectorId: number): Observable<Sector> {
    return this.http.get<{ data: Sector }>(`${this.api}/${sectorId}`).pipe(
      map(response => response.data)
    );
  }
}
