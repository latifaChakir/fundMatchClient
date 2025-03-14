import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Project} from "../../models/project/project.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private api = `${environment.apiUrl}/projects`;

  constructor(private http: HttpClient) { }
  saveProject(project: Project): Observable<Project> {
    return this.http.post<{ data:Project }>(`${this.api}/save`, project).pipe(
      map(response => response.data)
    );
  }
  getProjects(): Observable<Project[]> {
    return this.http.get<{ data: Project[] }>(this.api).pipe(
      map(response => response.data)
    );
  }
  deleteProject(projectId: number) {
    return this.http.delete(`${this.api}/${projectId}`);
  }

  updateProject(project: Project, projectId: number): Observable<Project> {
    return this.http.put<{ data: Project }>(`${this.api}/${projectId}`, project).pipe(
      map(response => response.data)
    );
  }
  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<{ data: Project }>(`${this.api}/${projectId}`).pipe(
      map(response => response.data)
    );
  }
  updateProjectStatus(projectId: number): Observable<Project>{
    return this.http.get<{ data: Project }>(`${this.api}/updateStatus/${projectId}`, {}).pipe(
      map(response => response.data)
    );
  }
  getStartupProjects(startupId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.api}/${startupId}/projects`);
  }


}
