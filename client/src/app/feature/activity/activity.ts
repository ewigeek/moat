import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ActivityResponse {
  id: string;
  name: string;
  description: string | undefined;
  createdAt: string;
  updatedAt: string;
}

export interface CreateActivityRequest {
  name: string;
  description?: string;
}

@Service()
export class Activity {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl + '/api/activities';

  getAll(): Observable<ActivityResponse[]> {
    return this.http.get<ActivityResponse[]>(this.baseUrl);
  }

  getById(id: string): Observable<ActivityResponse> {
    return this.http.get<ActivityResponse>(`${this.baseUrl}/${id}`);
  }

  create(request: CreateActivityRequest): Observable<ActivityResponse> {
    return this.http.post<ActivityResponse>(this.baseUrl, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
