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
    console.log('inside the service');
    console.log(environment.apiUrlBasePath);
    return this.http.post(
      environment.apiUrlBasePath + environment.postUser,
      user
    );
  }
}
