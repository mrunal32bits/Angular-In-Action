import { Component } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  msg?: string;

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.msg = this.dataService.getMsgForSibling();
  }

}
