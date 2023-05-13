import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataSorteio } from '../models/dataSorteio';


@Injectable({
  providedIn: 'root'
})
export class NumerosSorteioService {
  baseUrl: string = "";
  arrayData: DataSorteio | any;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/numeros';
  }

  getNumeros():Observable<DataSorteio> {

    this.arrayData = this.http.get<DataSorteio>(`${this.baseUrl}`)
    return this.arrayData;

  }

  getNumerosPorTelefone(telefone: string):Observable<DataSorteio> {
    this.arrayData = this.http.get<DataSorteio>(`${this.baseUrl}?telefone=${telefone}`)
    return this.arrayData;

  }


  getNumerosPorStatus(status: string):Observable<DataSorteio> {
    this.arrayData = this.http.get<DataSorteio>(`${this.baseUrl}?status=${status}`)
    return this.arrayData;

  }

  putNumeros(id:number, numeros:{}): Observable<DataSorteio> {
    this.arrayData = this.http.put<DataSorteio>(`${this.baseUrl}/${id}`, numeros)

    return this.arrayData;
  }

}
