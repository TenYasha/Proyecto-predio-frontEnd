import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from 'src/app/helper/api-helper';
import { Usuario } from 'src/app/models/user/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  //metodo del la api para poder listar
  listUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${baseUrl}/usuario/lista`);
  }

  //metodo del la api para poder update
  Update(data: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${baseUrl}/usuario/actualiza`, data);
  }
  UpdateEstado(data: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${baseUrl}/usuario/actualiza-estado`, data)
  }

  FindByIDUsuario(codigo: number): Observable<Usuario> {
    return this.http.get<any>(`${baseUrl}/usuario/${codigo}`);
  }

  DeleteByID(codigo:number | undefined):Observable<void>{
    return this.http.delete<any>(`${baseUrl}/usuario/borrar/${codigo}`)
  }

}
