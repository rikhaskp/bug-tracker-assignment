import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BugTrackerService {

  APIEndpoint = environment.APIEndpoint;
  constructor(private http: HttpClient) { }

  getAllBugs(): Observable<any> {
    return this.http.get(`${this.APIEndpoint}bugs/getAllBugs`);
  }

  deleteBug(id:any): Observable<any> {
    return this.http.delete(`${this.APIEndpoint}bugs/deleteBug`);
  }

  addBug(bugData: any): Observable<any> {
    return this.http.post(`${this.APIEndpoint}bugs/addBug`, {bugData});
  }


  getBugDetails(id: any): Observable<any> {
    return this.http.get(`${this.APIEndpoint}bugs/getBugDetails/${id}`);
  }

  editBug(id: any, editData: any): Observable<any> {

    return this.http.put(`${this.APIEndpoint}bugs/editBug`, {  id,  editData });
  }

}
