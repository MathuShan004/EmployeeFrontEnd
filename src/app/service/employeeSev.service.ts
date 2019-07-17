import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { employee } from '../model/employee';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeSevService {
  baseUrl = environment.apiUrl;
  storeDate: employee[];
constructor(private http: HttpClient) { }
getAllEmployeeDetails(): Observable<employee[]> {
  return this.http.get<employee[]>(this.baseUrl + '/AllEmployeeDetails');
 }
 getEmployeeById(empId: string): Observable<employee> {
 return this.http.get<employee>(this.baseUrl + '/GetEmployeeDetailsById/' + empId);
 }
 createEmployee(empmodel: employee): Observable<employee> {
  const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  return this.http.post<employee>(this.baseUrl + '/InsertEmployeeDetails/', empmodel, httpOptions);
 }
 updateEmployee(empmodel: employee): Observable<employee> {
  const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  return this.http.put<employee>(this.baseUrl + '/UpdateEmployeeDetails/' , empmodel, httpOptions);
 }
 deleteEmployee(empId: string): Observable<number> {
  const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  return this.http.delete<number>(this.baseUrl + '/DeleteEmployeeDetails?id=' + empId, httpOptions);
 }
}
