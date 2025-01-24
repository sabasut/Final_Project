import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://fakestoreapi.com/auth/login'

  constructor(private http : HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post(this.baseUrl, body, { headers });
  }
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }


  
//  წაშლის ავტორიზაციის ტოკენს  ლოკალსთორიჯიდან
  clearToken(){
    localStorage.removeItem('authToken');
  }
}
