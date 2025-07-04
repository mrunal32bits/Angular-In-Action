import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-rx-js',
  imports: [CommonModule],
  templateUrl: './rx-js.component.html',
  styleUrl: './rx-js.component.scss'
})
export class RxJSComponent {

  laptops = [
    { brand: "Acer", model: "Inspiron 15", price: 51000 },
    { brand: "Acer", model: "Pavilion 14", price: 55000 },
    { brand: "Acer", model: "Pavilion 14", price: 55000 }
  ]

  brandResponse: any;
  prizeResponse: any;

  intervalCount:any;
  timeCount: any;
  formattedTime: string = '00:00:00';

  stopInterval: Subscription | undefined;
  interval$ = interval(1000);
  intervalList: any = [];
  timeCountArray: any = [];
  totalTimeCount:any; 
  totalTImeCountArray: any = [];
  started: boolean = true;





  ngOnInit() {
    let count = 0;
    this.stopInterval = this.interval$.subscribe((value) => {
      count++;
      this.intervalCount = count;
      this.intervalList.push("Value number " + count + " emitted at " + new Date().toLocaleTimeString());
      if (count === 5) {
        this.stopInterval?.unsubscribe();
      }
    });

  }

  buyLaptop() {
  this.brandResponse = "Processing your request...";
   let buyLaptop = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.laptops.find(laptop => laptop.brand === "Dell" || laptop.brand === "HP")) {
          resolve("Laptop purchased successfully!");
        } else {
          reject("Laptop not available");
        }
      }, 3000);
    });

    buyLaptop.then((response) => {
      console.log(response);
      this.brandResponse = response;
    }).catch((error) => {
      console.log(error);
      this.brandResponse = error;
    });
  }

  async buyLaptop2(){
    this.prizeResponse = "Processing your request...";
    try {
      const res = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.laptops.find(laptop => laptop.price <= 50000)) {
            resolve("Laptop is affordable");
          } else {
            reject("Laptop not affordable");
          }
        }, 3000);
      });
      console.log(res);
      this.prizeResponse = res;
    } catch (error) {
      console.log(error);
      this.prizeResponse = error;
    }
  }
  startStopWatch() {
    let Count = 0;
    this.formattedTime = '00:00:00';
    this.stopInterval = this.interval$.subscribe(() => {
      Count++;
      const hours = Math.floor(Count / 3600).toString().padStart(2, '0');
      const minutes = Math.floor((Count % 3600) / 60).toString().padStart(2, '0');
      const seconds = (Count % 60).toString().padStart(2, '0');
      this.formattedTime = `${hours}:${minutes}:${seconds}`;
    });
    this.started = false;
  }
  stopWatch(){
    this.timeCount = this.formattedTime;
    this.timeCountArray.push(this.timeCount);
    console.log(this.timeCountArray);
    // this.totalTimeCount = this.timeCountArray.reduce((acc: any, curr: any) => {
    //   const [hours, minutes, seconds] = curr.split(':').map(Number);
    //   return acc + (hours * 3600 + minutes * 60 + seconds);
    // }, 0);
    // // Convert totalTimeCount (in seconds) back to hh:mm:ss format
    // const totalSeconds = this.totalTimeCount;
    // const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    // const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    // const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    // const formattedTotalTime = `${hours}:${minutes}:${seconds}`;
    // this.totalTImeCountArray.push(formattedTotalTime);
    console.log(this.totalTimeCount);
    this.stopInterval?.unsubscribe();
    this.formattedTime = '00:00:00';
    this.started = true;
  }
  resetWatch(){
    this.timeCountArray = [];
    this.formattedTime = '00:00:00';
  }






}


