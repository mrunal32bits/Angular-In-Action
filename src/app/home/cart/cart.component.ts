import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HomeComponent } from '../home.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  @Input() msg!:string;
  @Input() cartName!: string;
  @Input() items: any;

  itemId!: number;
  keyword: string = '';
  category: string = '';
  itemsList =  [
    { id: 1, name: "Laptop", price: 50000, category: "Electronics" },
    { id: 2, name: "Smartphone", price: 20000, category: "Electronics" },
    { id: 3, name: "Hat", price: 3000, category: "Fashion" },
    { id: 4, name: "Shoes", price: 1500, category: "Fashion" },
    { id: 5, name: "Table", price: 800, category: "Furniture" }
  ]
  selectedItem: any = [];

  @Output() notification = new EventEmitter<string>();

  msgForSibling: string = "Hello from Cart to Checkout";

  constructor(private dataService:DataService, private activeRoute:ActivatedRoute ) {}

  sendMessage() {
    this.notification.emit("Hello from Child");
  }

  ngOnInit() {
    this.sendMessageToSibling();
    this.itemId = this.activeRoute.snapshot.params['itemId'];
    this.activeRoute.queryParams.subscribe((params) => {
      this.keyword = params['keyword'];
      this.category = params['category'];
    });
    if(this.keyword || this.category) {
      this.itemsList = this.itemsList.filter((item: any) => {
        return (item.name.toLowerCase().includes(this.keyword.toLowerCase()) || item.category.toLowerCase().includes(this.category.toLowerCase()));
      });
    }
    if (this.itemId) {
      this.itemsList = this.itemsList.filter((item: any) => item.id == this.itemId);
    }

  }
  sendMessageToSibling() {
    this.dataService.setMsgForSibling(this.msgForSibling);
  }
  
}
