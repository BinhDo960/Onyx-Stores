import { CartService } from './services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart } from './models/cart.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  cart: Cart = { items: []}

  constructor(private CartService: CartService) {}

  ngOnInit(): void {
    this.CartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    })
  }
  
  
}
