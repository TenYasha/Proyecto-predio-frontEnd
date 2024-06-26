import { Injectable } from '@angular/core';
import baseUrl from '../../helper/api-helper';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/user/usuario';
import { Observable, catchError } from 'rxjs';
import { Rol } from 'src/app/models/rol/rol';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private http: HttpClient) {}

  obtenerCargos(): Observable<Rol[]> {
    return this.http.get<Rol[]>(`${baseUrl}/usuario/lista-rol`);
  }

  addUser(usuario: any): Observable<any> {
    return this.http.post(`${baseUrl}/usuario/registrar`, usuario);
  }
}
