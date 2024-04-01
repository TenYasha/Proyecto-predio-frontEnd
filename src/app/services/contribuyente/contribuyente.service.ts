import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from 'src/app/helper/api-helper';
import { Contribuyente } from 'src/app/models/contribuyente/contribuyente';

@Injectable({
  providedIn: 'root'
})
export class ContribuyenteService {

  constructor(private http: HttpClient) {}
    listContribuyente(): Observable<Contribuyente[]> {
      return this.http.get<Contribuyente[]>(`${baseUrl}/contribuyente/lista-contribuyente`)
    }
   }

