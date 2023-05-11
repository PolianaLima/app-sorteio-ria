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
    this.baseUrl = '../../../data/sorteio_data.json';
  }

  getNumeros():Observable<DataSorteio> {

    this.arrayData = this.http.get<DataSorteio>(`${this.baseUrl}`)
    return this.arrayData;

    console.log(this.baseUrl);

  }

}
