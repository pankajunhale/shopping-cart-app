import { Component, Input } from '@angular/core';
import { Product } from '../dto';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input({ required: true }) products: Array<Product> = new Array<Product>();

  constructor() { }
}
