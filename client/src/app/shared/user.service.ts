import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    name: '',
    email: '',
    password: ''
  }

  imgData: any;

  constructor( private http: HttpClient) { }

  //API calling
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl + '/signup',user);
  }

  login(authCredentials: any){
    return this.http.post(environment.apiBaseUrl + '/login', authCredentials);
  }

  downloadFile(x: string): Observable<any>{
    const param = new HttpParams().set('id', x);
    const options = {
      params: param
    };
    return this.http.get(environment.apiBaseUrl + `/api/${x}`, {...options, responseType: 'blob'});
  }

  home(){
    //to call home url from backend
  }

  //General function
  getToken(){
    return localStorage.getItem('token');
  }

  setToken(token: string){
    localStorage.setItem('token', token);
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  getUserPayload(){
    var token = this.getToken();
    if(token){
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else{
      return null;
    }
  }

  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if(userPayload){
      return true;
    }
    else{
      return false
    }
  }

}
