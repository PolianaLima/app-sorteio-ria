import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-carrossel',
  templateUrl: './card-carrossel.component.html',
  styleUrls: ['./card-carrossel.component.css']
})
export class CardCarrosselComponent implements OnInit{

  @Input()
  title: string = "";

  @Input()
  itens: string = "";

  constructor() { }


  ngOnInit(): void {
  }

}
