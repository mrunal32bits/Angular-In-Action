import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { concat, concatMap, debounce, debounceTime, delay, distinctUntilChanged, from, fromEvent, interval, map, merge, mergeMap, Observable, of, ReplaySubject, retry, scan, Subject, Subscription, take, tap, timer, toArray } from 'rxjs';
import { DataService } from '../data.service';
import { UserService } from '../ngrx-demo';
import { FormsModule } from '@angular/forms';
import { ReportComponent } from '../report/report.component';

@Component({
  selector: 'app-rx-js',
  imports: [CommonModule,FormsModule,ReportComponent],
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
  //fromEvent
  fromEventList:any = [];
  //toArray and of
  toArrayResponse:any = [];

  //progress bar
  download: any;
  progress:any = 0;
  //typewriter effect
  typewriter:any;
  typewriterText: string = '';
  //random quote
  randomQuoteObs:any;
  randomQuote:string = '';
  //retry HTTP call
  userData: any;
  //debounce
  @ViewChild('debounceTest') debounceTest?:ElementRef;
  // Subject
  globalVar = ""

  constructor(private userService:UserService, private dataS:DataService){}

  @ViewChild('emitBtn') emitBtn?:ElementRef;




  ngOnInit() {

     // Subject - Multicast same value to difference observers
    const subject = new Subject();

    subject.subscribe(val => console.log('Subscriber A:', val));
    subject.subscribe(val => console.log('Subscriber B:', val));

    subject.next(Math.random()); // Can act as emitter/observer - cast value to stream
    
    this.dataS.globalVar.subscribe((res)=>this.globalVar = res);

   // Observables

   const myObservale = new Observable((response)=>{
    response.next(10),
    response.next("Mrunal"),
    response.next(true),
    setTimeout(()=>response.next("Angular"),2000)
    // response.error(new Error);
   }
   );

   const myObserver = {
    next: ((value:any)=>console.log(value)),
    // error: ((error:any)=>console.log(error)),
    compelte: ()=>console.log("DOne")
   }

   // observable.subscribe(myObserver)
   myObservale.subscribe(subject) // this turn 
   //short hand syntax
   myObservale.subscribe(
    value=>console.log(value)
   )


   // Replay Subject

   const messgaes = new ReplaySubject<string>(1);

   messgaes.subscribe(val=>console.log("UserA",val))
   messgaes.next("Good Morning")
   messgaes.next("Hellow User B")
   messgaes.next("Hope You are doing Great")
   messgaes.subscribe(val=>console.log("UserB",val))
   messgaes.next("Hello dear")

   const obs1 = of("A","B").pipe(delay(1000))
   const obs2 = of("C","D")

   merge(obs1,obs2).subscribe(value=>console.log(value)) // join two obs and emit them parallel or ASA they arrive
   concat(obs1,obs2).subscribe(console.log) // join two obs emit secnd only after 1st obs completes

   const obs3 = of("Id1","Id2")
   
   obs3.pipe(
    mergeMap(id=>of(`${id}orders`,`${id}wishlist`).pipe(delay(1000))) // map nested obs to nex obs and faltten then in one and emit FIFO mannner
   ).subscribe(console.log)

   obs3.pipe(
    concatMap(id=>of(`${id}order1`,`${id}order2`,`${id}order3`).pipe(delay(1000))) 
    // map nested obs to nex obs and faltten then one but emit them seqentially 
    // first completes then second competes then third so on
   ).subscribe(console.log)

   

    // debounceTime
    const clicks = fromEvent(document, 'click');
    const result = clicks.pipe(debounceTime(1000));
    result.subscribe(x => console.log("Click Happended",x));
    // Interval
    let count = 0;
    this.stopInterval = this.interval$.subscribe((value) => {
      count++;
      this.intervalCount = count;
      this.intervalList.push("Value" + count + " emitted at " + new Date().toLocaleTimeString());
      if (count === 5) {
        this.stopInterval?.unsubscribe();
      }
    });
    //Timer
    let timerCount = 0;
    this.stopTimer = this.timer.subscribe(() => {
      timerCount++;
      this.timerCount = timerCount;
      this.timerList.push("Value" + new Date().toLocaleTimeString() + " with value: " + timerCount);
      if(timerCount === 5){
        this.stopTimer?.unsubscribe();
      }
    })
    of(1,2,3,4,5).pipe(toArray()).subscribe((res)=>{
      this.toArrayResponse = res;
    })
  }

  ngAfterViewInit(){
    //fromEvent and take
    let count=0;
    fromEvent(this.emitBtn?.nativeElement,'click').pipe(take(5)).subscribe((res)=>{
      const countVal = "Video" + count++;
      this.fromEventList.push(countVal)
      console.log(this.fromEventList)
    })
    // debounce and distinctUntilChanged
    fromEvent(this.debounceTest?.nativeElement,'input').pipe(
      map((event:any)=> event.target?.value),
      debounce((value)=>{
        const delay:any = this.calculateDelay(value);
        return interval(delay)}),
        distinctUntilChanged()
    ).subscribe((res)=>{console.log(res)})

  }
  calculateDelay(value:string):number{
    const  len = value.trim().length;
    if(len <= 10) return 1000
    if(len >10) return 3000
    return 0
  }

  buyLaptop() {
  // Promise
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
    // Tap and Map Operator
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
    // from, concatMap, delay
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
    // map
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


  // retry API call when offline and take only n number of objects from response and modefy the values
  getUserData() {
    // retry, map 
    this.userService.getUsers().pipe(
      retry({ delay: 5000, count: 5 }),

      map((users: any[]) => 
      users.slice(0, 2).map(user => ({
        ...user,
        name: 'Hellow ' + user.name
      }))
      )
    ).subscribe({
      next: (users) => {
      this.userData = users;
      console.log(users)
      },
      error: (error) => {
      throw new Error("No Internet Connection");
      }
    });
  }


  changeGlobalVar(global:any){
    // this.globalVar = global.value;
    this.dataS.globalVar.next(global.value);
  }

  // search(){
  //   const debounce = document.getElementById('debounce');
  //   if (debounce) {
  //     const input = fromEvent(debounce, 'input').pipe(
  //       map(event=>console.log(event.target?.value))
  //     );
  //   } else {
  //     console.warn("Element with id 'debounce' not found.");
  //   }
  // }







}


