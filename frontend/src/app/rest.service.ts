import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  backendUrl: string;
  notes: any[] = [];
  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.backendUrl = 'http://localhost:5000';
    } else {
      this.backendUrl = '';
    }
  }
  getNotes(): Observable<any[]> {
    const queryParams = new HttpParams({
      fromObject: { email: localStorage.getItem('user') || '' },
    });
    return this.http.get<any[]>(this.backendUrl + '/api/notes', {
      params: queryParams,
    });
  }
  addNote(note: any) {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.backendUrl + '/api/notes', note, {
      headers: options,
    });
  }
  getNote(id: any) {
    return this.http.get<any[]>(this.backendUrl + `/api/notes/${id}`);
  }
  deleteNote(id: any) {
    return this.http.delete<any[]>(this.backendUrl + `/api/notes/${id}`);
  }
  updateNote(id: any, note: any) {
    const options = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any[]>(this.backendUrl + `/api/notes/${id}`, note, {
      headers: options,
    });
  }
  getUserDetails() {
    const queryParams = new HttpParams({
      fromObject: { email: localStorage.getItem('user') || '' },
    });
    return this.http.get<any[]>(this.backendUrl + '/api/user', {
      params: queryParams,
    });
  }
}
