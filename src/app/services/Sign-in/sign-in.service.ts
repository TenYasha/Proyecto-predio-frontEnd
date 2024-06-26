import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../../helper/api-helper';
import { Observable, Subject } from 'rxjs';
import { Usuario } from 'src/app/models/user/usuario';
import { AccesToken } from 'src/app/models/AccesToken/acces-token';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private http: HttpClient) { }

  //generamos el token
  public generateToken(loginData: any): Observable<AccesToken> {
    return this.http.post(`${baseUrl}/services/auth/signin`, loginData);
  }
  //traer info usuario basado en su token
  public getCurrentUser(): Observable<Usuario> {

    console.log("get current");
    return this.http.get(`${baseUrl}/usuario/actual-usuario`);
  }
  //iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token: any) {
    localStorage.setItem('token', token);

    console.log("establecer token");
    return true;
  }
  //saber si estamos loguado
  public isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {

    console.log("false");
      return false;
    } else {

    console.log("ture");
      return true;
    }
  }
  //cerramos sesion y eliminamos los token del localStorage
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }
  //get el token del localStorage
  public getToken() {

    console.log("guardar el token en el localStorage");
    return localStorage.getItem('token');
  }

  //save user in localStorage,but como json
  public setUser(user: any) {

    console.log("guardando el usuario en el localStorage");
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser() {
    let userStr = localStorage.getItem('user');
    console.log("esta en obtener usuario");
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }

  //traer los roles del usuario
  public getUserRole() {
    let user = this.getUser();
    console.log("esta en obtener roles");
    return user.authorities[0].authority;
  }



}
