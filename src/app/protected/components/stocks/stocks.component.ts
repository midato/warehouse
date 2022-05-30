import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {

  loading: false;
  stocks: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  remove(stock: any, i: number) {
  }

}
