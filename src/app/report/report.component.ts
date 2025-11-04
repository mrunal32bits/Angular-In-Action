import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-report',
  imports: [],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

    //Subject 
    globalVar = "";
  
    constructor(public dataS: DataService) {
     
    }
  
    ngOnInit() {
       this.dataS.globalVar.subscribe((res)=>this.globalVar = res);
    }
  
    onChange(global:any){
      this.globalVar = global.value;
      this.dataS.globalVar.next(global.value);
    }

}
