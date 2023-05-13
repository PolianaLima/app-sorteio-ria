import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataSorteio } from 'src/app/models/dataSorteio';
import { NumerosSorteioService } from 'src/app/services/numeros-sorteio.service';

@Component({
  selector: 'app-info-comprador',
  templateUrl: './info-comprador.component.html',
  styleUrls: ['./info-comprador.component.css']
})
export class InfoCompradorComponent implements OnInit{
  //Controle de views
  statusButtonPesquisa: boolean = true;
  statusRes: boolean = false;

  mensagem: string = "";
  link: string = "";
  nome: string = "";

  telefone: string = "";

  results: DataSorteio;
  numerosComprados: [] = [];



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


  pesquisar() {
    console.log("Cliquei");
    console.log(this.telefone);

    this.service.getNumerosPorTelefone(this.telefone).subscribe({
      next: (res) => {

        if (res.length <= 0) {
          console.log("Nenhum numero encontrado");
          this.mensagem = "Nenhum numero encontrado, digite novamente ou retorne para selecionar o numero desejado ";
          this.link = "clicando aqui"

        } else {
          this.results = res;
          this.nome = res[0].name_comprador;
          this.statusButtonPesquisa = false;
          this.statusRes = true;

        }

      },
      error: (err)=> console.log(err)
    })

  }

}
