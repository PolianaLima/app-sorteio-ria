import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-numeros-sorteio',
  templateUrl: './numeros-sorteio.component.html',
  styleUrls: ['./numeros-sorteio.component.css']
})
export class NumerosSorteioComponent implements OnInit {

  numerosSorteio: number[] = [];


    constructor() {

    }


    ngOnInit(): void {

      console.log("Oiiiii to aqui");

      this.pushNumeroSorteio();
      console.log(this.numerosSorteio);


    }

    pushNumeroSorteio() {
      for (let i = 1; i <= 100; i++) {

        let numero = i;

        this.numerosSorteio.push(i)
      }

    }








}
