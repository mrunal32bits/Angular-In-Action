import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-e-com',
  imports: [CommonModule, FormsModule],
  templateUrl: './e-com.component.html',
  styleUrl: './e-com.component.scss'
})
export class EComComponent {

  items = [
    { id: 1, name: "Laptop", price: 50000,imageUrl:"https://picsum.photos/201"},
    { id: 2, name: "Smartphone", price: 20000,imageUrl: "https://picsum.photos/199"},
    { id: 3, name: "Headphones", price: 3000, imageUrl:"https://picsum.photos/202" },
    { id: 4, name: "Keyboard", price: 1500, imageUrl:"https://picsum.photos/203" },
    { id: 5, name: "Mouse", price: 800, imageUrl:"https://picsum.photos/198" }
  ]
  cartItemsList : any = [];
  placedOrder: any = [];
  imageUrl: string = "https://picsum.photos/200";
  imageWidth: number = 100;
  imageHeight: number = 100;

  addToCart(item: any) {
    const existingItem = this.cartItemsList.find((cartItem: any) => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
      existingItem.totalPrice = item.price * existingItem.quantity; 
    } else {
      this.cartItemsList.push({ ...item, quantity: 1, totalPrice: item.price });
    }
  }
  removeFromCart(item: any) {
    const existingItem = this.cartItemsList.find((cartItem: any) => cartItem.id === item.id);
    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice = item.price * existingItem.quantity;
      } else {
        this.cartItemsList = this.cartItemsList.filter((cartItem: any) => cartItem.id !== item.id);
      }
    }
  }

  calculateTotal(){
    let total = 0;
    this.cartItemsList.forEach((item: any) => {
      total += item.totalPrice;
    });
    return total;
  }
  
  placeOrder(){
    alert("Order Placed Successfully!");
    this.placedOrder = [...this.placedOrder, ...this.cartItemsList.map((item: any, index: number) => ({ ...item, orderIndex: Date.now() + index }))];
    this.cartItemsList = [];
  }
  cancelOrder(item: any) {
    if (item.quantity > 1) {
      const qtyToCancelStr = prompt(`You have ordered ${item.quantity} of ${item.name}. How many do you want to cancel?`, "1");
      const qtyToCancel = qtyToCancelStr ? parseInt(qtyToCancelStr, 10) : 0;
      if (qtyToCancel > 0 && qtyToCancel < item.quantity) {
      item.quantity -= qtyToCancel;
      item.totalPrice = item.price * item.quantity;
      alert(`${qtyToCancel} ${item.name}(s) cancelled. Remaining: ${item.quantity}`);
      // Update the placedOrder array with new quantity
      this.placedOrder = this.placedOrder.map((order: any) =>
        order.orderIndex === item.orderIndex ? { ...order, quantity: item.quantity, totalPrice: item.totalPrice } : order
      );
      } else if (qtyToCancel == item.quantity) {
      alert("Order Cancelled!");
      this.placedOrder = this.placedOrder.filter((order: any) => order.orderIndex !== item.orderIndex);
      } else{
        alert("Invalid quantity entered. Please enter a valid number.");
      }// else do nothing if invalid input
    } else {
      alert("Order Cancelled!");
      this.placedOrder = this.placedOrder.filter((order: any) => order.orderIndex !== item.orderIndex);
    }
  }

}
