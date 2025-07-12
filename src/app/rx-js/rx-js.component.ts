import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { concatMap, delay, from, interval, map, of, Subscription, take, tap, timer } from 'rxjs';

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

  
  timeCount: any;
  formattedTime: string = '00:00:00';


  intervalCount:any;
  stopInterval: Subscription | undefined;
  interval$ = interval(1000);

  timerCount: any;
  stopTimer: Subscription | undefined;
  timer = timer(5000, 1000);
  timerList: any = [];


  intervalList: any = [];
  timeCountArray: any = [];
  totalTimeCount:any; 
  totalTImeCountArray: any = [];
  started: boolean = true;

  //progress bar
  download: any;
  progress:any = 0;
  //typewriter effect
  typewriter:any;
  typewriterText: string = '';
  //random quote
  randomQuoteObs:any;
  randomQuote:string = '';






  ngOnInit() {
    
    let count = 0;
    this.stopInterval = this.interval$.subscribe((value) => {
      count++;
      this.intervalCount = count;
      this.intervalList.push("Value" + count + " emitted at " + new Date().toLocaleTimeString());
      if (count === 5) {
        this.stopInterval?.unsubscribe();
      }
    });
    let timerCount = 0;
    this.stopTimer = this.timer.subscribe(() => {
      timerCount++;
      this.timerCount = timerCount;
      this.timerList.push("Value" + new Date().toLocaleTimeString() + " with value: " + timerCount);
      if(timerCount === 5){
        this.stopTimer?.unsubscribe();
      }
    })

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
    console.log(this.totalTimeCount);
    this.stopInterval?.unsubscribe();
    this.formattedTime = '00:00:00';
    this.started = true;
  }
  resetWatch(){
    this.timeCountArray = [];
    this.formattedTime = '00:00:00';
  }

  downloadFile(){
    this.download?.unsubscribe();
    this.download = interval(100).pipe(
      tap((value)=> {
        if(value > 100){
          alert("Download completed");
          this.download.unsubscribe();
        }
      }),
      map((value) => value + Math.floor(Math.random()))
    ).subscribe((value) => {
      this.progress = value;
    })
  }

  startTypewriter(){
     this.typewriter?.unsubscribe();
    const originalText  = "This is a typewriter effect example.";
    this.typewriter = from(originalText).pipe(
  concatMap(char => of(char).pipe(delay(100)))
).subscribe((value)=>{
        console.log(value);
        this.typewriterText += value
    })
   
    this.typewriterText = '';
  }

  getRandomQuote(){
    const randomQuotes = [
      "The only limit to our realization of tomorrow is our doubts of today.",
      "The future belongs to those who believe in the beauty of their dreams.",
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
      "Believe you can and you're halfway there."]
    this.randomQuoteObs?.unsubscribe();
    this.randomQuoteObs = interval(5000).pipe(
      map((value) => {
        return randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
      }),
    ).subscribe((value)=>{
      this.randomQuote = value;
    })
    this.randomQuote = '';

  }






}


