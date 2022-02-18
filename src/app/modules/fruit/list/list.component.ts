import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FruitService } from 'src/app/services/fruit.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  fruits: Array<Fruit> = [];
  cart: any = {};
  selectedFruit: string = 'Apple';
  objectKeys = Object.keys;

  constructor(private FruitService: FruitService, private CartService: CartService) { }

  ngOnInit(): void {
    this.getFruit();
  }

  async getFruit() {
    let response = await this.FruitService.send('getAllFruits', '');
    if (response.status === 200) {
      this.fruits = response.body;
      console.log(this.fruits);
      Object.keys(this.fruits).forEach(each => {
        this.cart[each] = 0;
      })
      console.log(this.cart)
    } else {
      alert(response.error.error.name)
    }
  }

  async viewFruit(name) {
    let response = await this.FruitService.send('getFruitByName', name);
    if (response.status === 200) {
      let content = JSON.stringify(response.body);
      if (response.body.quantity == 0) content = 'Out of stock!';
      else content = response.body.quantity + ' fruits. Stock available!';
      alert(content);
    } else {
      alert(response.error.error.name)
    }
  }

  fruitChange(e) {
    console.log(e);
    this.selectedFruit = e.target.value;
  }

  incrementCount() {
    if(this.cart[this.selectedFruit]['quantity'] < 1) {
      alert("Out of stock!");
      return;
    }
    this.cart[this.selectedFruit] = this.cart[this.selectedFruit] + 1;
  }

  decrementCount() {
    if(this.cart[this.selectedFruit] == 0) {
      return;
    }
    this.cart[this.selectedFruit] = this.cart[this.selectedFruit] - 1;
  }

  async purchaseFruits() {
    let object = {...this.cart};
    Object.keys(this.cart).forEach(each => {
      if (object[each] == 0) {
        delete object[each];
      }
    })
    let response = await this.CartService.send('purchase', object);
    if (response.status === 201) {
      this.getFruit();
      alert("Purchase successful!");
    } else {
      alert(response.error.error)
    }
  }
}

interface Fruit {
  category: string;
  quantity: number;
  price: number
}