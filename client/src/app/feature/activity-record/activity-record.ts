import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ActivityRecordResponse {
  id: string;
  activityId: string;
  date: string;
  durationMinutes: number | null;
  timeOfDay: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT' | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateActivityRecordRequest {
  activityId: string;
  date: string;
  durationMinutes?: number;
  timeOfDay?: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
  description?: string;
}

@Service()
export class ActivityRecord {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api/activity-records`;

  getAll(): Observable<ActivityRecordResponse[]> {
    return this.http.get<ActivityRecordResponse[]>(this.baseUrl);
  }

  getById(id: string): Observable<ActivityRecordResponse> {
    return this.http.get<ActivityRecordResponse>(`${this.baseUrl}/${id}`);
  }

  create(request: CreateActivityRecordRequest): Observable<ActivityRecordResponse> {
    return this.http.post<ActivityRecordResponse>(this.baseUrl, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
