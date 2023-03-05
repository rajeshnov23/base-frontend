import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  postUser(user: User): Observable<any> {
    console.log('inside the postUser');
    console.log(environment.apiUrlBasePath);
    return this.http.post(
      environment.apiUrlBasePath + environment.registerUser,
      user
    );
  }

  checkIfUserNameExists(user:string): Observable<any>{
    console.log('inside the checkIfUserNameExists');
    return this.http.post(
      environment.apiUrlBasePath + environment.checkUserNameExists,
      {username:user}
    );
  }
  checkIfEmailExists(user:string): Observable<any>{
    console.log('inside the checkIfEmailExists');
    return this.http.post(
      environment.apiUrlBasePath + environment.checkEmailExists,
      {email:user}
    );
  }
}
