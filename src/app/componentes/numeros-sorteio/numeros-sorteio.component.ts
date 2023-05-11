import { Component, OnInit } from '@angular/core';
import { NumerosSorteio } from './../../models/numerosSorteios';
import data_sorteio from '../../../data/data_numeros.json';

import { NumerosSorteioService } from '../../services/numeros-sorteio.service';
import { DataSorteio } from 'src/app/models/dataSorteio';

@Component({
  selector: 'app-numeros-sorteio',
  templateUrl: './numeros-sorteio.component.html',
  styleUrls: ['./numeros-sorteio.component.css']
})
export class NumerosSorteioComponent implements OnInit {
  //Array de numeros que vem do arquivo JSON
  numerosSorteio: NumerosSorteio[] = [];

  //Criando nova Variavel que recebera Arquivo joson
  result: DataSorteio;

  //Array montado para cada usuario que seleciona o arquivo
  numerosSelecionado: number[] = []

  //??
  arraydeNumeros: NumerosSorteio;


  //Button -
  statusButton: boolean = false;
  testeDesativa: string = ""
  //clickId: number = 0;

  //Dados do formulario
  name: string = "";
  telefone: string = "";
  statusForm: boolean = false;
  campoNomePlaceholder: string = "Digite Seu nome";
  campoTelefonePlaceholder: string = "Digite Seu telefone";


  erroCampoFormulario:string = ""


  //Mensagem para o usuario
  mensagem: string = "";
  itens: string = "";
  statusMensagem: boolean = false;

  //Modal-Erro-Enviando-sem-dados
  statusModalErro: boolean = false;

  constructor(private service: NumerosSorteioService) {

    this.result = {
      numeros:[
        {
          id: 0,
        numero: 0,
        status: "",
        name_comprador: "",
          telefone: ""
        }
      ]
    }

    this.arraydeNumeros = {
      id: 0,
      numero: 0,
      status: "",
      name_comprador: "",
      telefone: ""
    }

  }


  ngOnInit(): void {

    this.service.getNumeros().subscribe({
      next: (res) => {
        console.log(res)
      },
      error:(err)=>console.log(err)

    })


    if (data_sorteio) {

      data_sorteio.forEach((item) => {

        this.numerosSorteio.push(item);

      })

    }


  }


  //Função chamada ao clicar em selecionar o Numero no Array de numeros
  selecionarNumero(e: EventTarget | null, value: number, id: number) {

    //Verificando se o numero ja foi selecionado
    let result = this.numerosSelecionado.includes(value);

    //Clicando duas uma vez seleciona, duas vezes tira a seleção

    if (!result) {
      this.numerosSelecionado.push(value);
      this.numerosSorteio[id].status = "I"

      console.log(this.numerosSelecionado);

    } else {
      const indice = this.numerosSelecionado.indexOf(value)
      this.numerosSelecionado.splice(indice, 1);
      this.numerosSorteio[id].status = "D"
      console.log(this.numerosSelecionado);
    }
  }


  //Ao clicar no butao enviar numetos enviados
  concluirSelecao() {
    if (this.numerosSelecionado.length == 0) {
      this.statusModalErro = true;
    } else {
      this.statusForm = true;
    }

  }

  enviarDadosSelecionados() {


    if (!this.name || !this.telefone) {
      this.campoNomePlaceholder = "***Campo Obrigatório";
      this.campoTelefonePlaceholder = "***Campo Obrigatorio";
      this.erroCampoFormulario = "alerta";
    }else{
      for (let i = 0; i < this.numerosSelecionado.length; i++) {
        const element = this.numerosSelecionado[i].valueOf();
        const index = this.numerosSorteio.findIndex(numero => numero.numero == element);
        this.numerosSorteio[index].name_comprador = this.name;
        this.numerosSorteio[index].telefone = this.telefone;

        this.name = "";
        this.telefone = "";

      }
      console.log("Array Alterados: ");

      console.log(this.numerosSorteio);

      this.fecharToltip();
      this.statusMensagem = true;
      this.enviarMensagemUsuario();



    }
  }


  /* Erros ao enviar numeros sem selecionar*/
  fecharErroSelecionandoNumeros() {
    this.statusModalErro = false;
  }


  fecharToltip() {
    //se a pessoa clica em enviar dados e cancela a operação, tira a seleção dos itens ja selecionados?
    this.statusForm = false;
  }




  enviarMensagemUsuario() {

    console.log(this.numerosSelecionado);

    this.mensagem = `Você escolheu o(s) numero(s) ${this.numerosSelecionado}`

    this.numerosSelecionado = [];

    console.log(this.numerosSelecionado);

  }


  fecharMensagem() {
    this.statusMensagem = false;
  }
}
