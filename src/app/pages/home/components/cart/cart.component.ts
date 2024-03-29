import { CartService } from './../../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../../../models/cart.model';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl:'./cart.component.html',
  
})
export class CartComponent implements OnInit{
  cart: Cart = { items: [
    {
    product: 'https://via.placeholder.com/150',
    name: 'Sneakers',
    price: 150,
    quantity: 1,
    id: 1,
    },
    {
      product: 'https://via.placeholder.com/150',
      name: 'Sneakers',
      price: 150,
      quantity: 3,
      id: 1,
    },
    {
      product: 'https://via.placeholder.com/150',
      name: 'Sneakers',
      price: 150,
      quantity: 1,
      id: 1,
    }
]};

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];

    constructor(private CartService: CartService, private http: HttpClient){  }

    getTotal(items: Array<CartItem>): number{
      return this.CartService.getTotal(items);
    }

    onClearCart(): void {
      this.CartService.clearCart();
    }

    onRemoveFromCart(item: CartItem): void {
      this.CartService.removeFromCart(item);
    }

    onAddQuantity(item: CartItem): void {
      this.CartService.addToCart(item);
    }

    onReduceQuantity(item: CartItem): void {
      this.CartService.reduceQuantity(item);  
    }

    onCheckout(): void {
      this.http.post('http://localhost:4242/checkout', {
        items: this.cart.items
      }).subscribe(async(res: any) => {
        let stripe = await loadStripe('pk_test_51OiU8iAU3f4TR0on644OlwOtl3m3iahPXzspP30REjJ9yqe3EKlVx4JB9B5U6Zb1ZaMzZ7tElZggE0HcI7S2hZLn00o68aeVNx');
        stripe?.redirectToCheckout({
          sessionId: res.id
        })
      });
    }

  ngOnInit(): void {
    this.CartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
     });
 }
}
