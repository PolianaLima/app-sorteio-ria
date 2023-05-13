import { Component, OnInit } from '@angular/core';
import { NumerosSorteioService } from '../../services/numeros-sorteio.service';
import { DataSorteio } from 'src/app/models/dataSorteio';

@Component({
  selector: 'app-numeros-sorteio',
  templateUrl: './numeros-sorteio.component.html',
  styleUrls: ['./numeros-sorteio.component.css']
})
export class NumerosSorteioComponent implements OnInit {


  statusPage: boolean = true;

  //Criando nova Variavel que recebera Arquivo joson
  results: DataSorteio;

  //Array montado para cada usuario que seleciona o arquivo
  numerosSelecionado: number[] = []

  //Dados do formulario
  name: string = "";
  telefone: string = "";
  statusForm: boolean = false;
  campoNomePlaceholder: string = "Digite Seu nome";
  campoTelefonePlaceholder: string = "Digite Seu telefone";
  //Classe para status form
  erroCampoFormulario: string = ""

  //Mensagem para o usuario //Tootltips
  statusTooltip: boolean = false;
  mensagem: string = "";
  statusMensagem: boolean = false;

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
    this.service.getNumeros().subscribe({
      next: (res) => {
        this.results = res;
      },
      error:(err)=>console.log(err)
    })

  }

  //Função chamada ao clicar em selecionar o Numero no Array de numeros
  selecionarNumero(value: number, id: number) {

    console.log(this.results);



    //Clicando duas uma vez seleciona, duas vezes tira a seleção

    if (this.results[id].status === "I") {

      this.statusTooltip = true;
      this.statusPage = false;
      this.mensagem = "Número Indisponivel"

    }else if (this.results[id].status ==="D") {
      this.numerosSelecionado.push(value);
      this.results[id].status = "S"

    } else {
      const indice = this.numerosSelecionado.indexOf(value)
      this.numerosSelecionado.splice(indice, 1);
      this.results[id].status = "D"
      console.log(this.numerosSelecionado);
    }
  }


  //Ao clicar no butao enviar numeros enviados
  concluirSelecao() {
    if (this.numerosSelecionado.length == 0) {
      this.statusTooltip = true;
      this.statusPage = false;
      this.mensagem = "Escolha 01 ou mais numero para participar"
    } else {
      this.statusPage = false;
      this.statusForm = true;
    }

  }

  enviarDadosSelecionados() {
    this.statusPage = false;

    if (!this.name || !this.telefone) {
      this.campoNomePlaceholder = "***Campo Obrigatório";
      this.campoTelefonePlaceholder = "***Campo Obrigatorio";
      this.erroCampoFormulario = "alerta";
    }else{
        this.atualizarArray();
         }
    }

  fecharFormumario() {
    this.statusForm = false;
    this.statusPage = true;
  }

  fecharToltip() {
    this.statusTooltip = false;
    this.statusPage = true;
  }

  enviarMensagemUsuario() {

    this.statusPage = false;
    console.log(this.numerosSelecionado);
    this.statusTooltip = true;
    this.mensagem = `Você escolheu o(s) numero(s) ${this.numerosSelecionado}`
    this.numerosSelecionado = [];
    console.log(this.numerosSelecionado);




  }

  atualizarArray() {
    for (let i = 0; i < this.numerosSelecionado.length; i++) {
      const element = this.numerosSelecionado[i].valueOf();
      const index = this.results.findIndex((value=>value.numero == element));
      this.results[index].status = "I"
      this.results[index].name_comprador = this.name;
      this.results[index].telefone = this.telefone;

      const numeros = {
        "id": this.results[index].id,
        "numero": this.results[index].numero,
        "status": this.results[index].status,
        "name_comprador": this.results[index].name_comprador,
        "telefone": this.results[index].telefone
     }

      this.service.putNumeros(index, numeros).subscribe({
        next: (res) => {
          console.log(res)
        },
        error: (err) => console.log(err)

      })




    }


    this.name = "";
    this.telefone = "";


    this.fecharFormumario()

    this.enviarMensagemUsuario();
/*

      for (let i = 0; i < this.numerosSelecionado.length; i++) {
        const element = this.numerosSelecionado[i].valueOf();

        const index = this.results.findIndex(numero => numero.id == element);


        this.results[index].status = "I"
        this.results[index].name_comprador = this.name;
        this.results[index].telefone = this.telefone;
      }

      this.name = "";
      this.telefone = "";

      console.log("Array Alterados: ");

      console.log(this.results);


      this.fecharFormumario()

      this.enviarMensagemUsuario(); */


    }



}
