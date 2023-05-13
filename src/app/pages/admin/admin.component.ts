import { Component, OnInit } from '@angular/core';
import { DataSorteio } from 'src/app/models/dataSorteio';
import { NumerosSorteioService } from 'src/app/services/numeros-sorteio.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  usuario: string = "";
  senha: string = "";
  statusForm: boolean = true;
  statusPageAdmin: boolean= false  ;
  statusTooltip = false;
  statusBtnSorteio: boolean = false;
  statusResultadoSorteio: boolean = false;


  //Dados da Api
  results: DataSorteio;


  numeroSorteado: number = 0;
  nomeSorteado: string = "";



  constructor(private service: NumerosSorteioService) {

    this.results = [
      {
          id: 0,
          numero: 0,
          status: "",
          name_comprador: "",
          telefone: ""
        }
    ]

  }

  ngOnInit(): void {
  }

  login() {


    if (this.usuario === "polly" && this.senha === "5386") {
      this.statusPageAdmin = true;
      this.statusBtnSorteio = true;

      this.statusTooltip = false;
      this.statusForm = false;



      this.buscarNumerosVendidos()
    } else {
      this.statusTooltip = true
    }



  }

  buscarNumerosVendidos() {
    this.service.getNumerosPorStatus("I").subscribe({
      next: (res) => {
        this.results = res;
        console.log(res)
      },
      error: (err)=>console.log(err)

    })
  }

  sortear() {


    const indexNumero = Math.floor(Math.random() * this.results.length);

    console.log(indexNumero);


    this.numeroSorteado = this.results[indexNumero].numero;
    this.nomeSorteado = this.results[indexNumero].name_comprador

    this.statusResultadoSorteio = true;

  }



}
