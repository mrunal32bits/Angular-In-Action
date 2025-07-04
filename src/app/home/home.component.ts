import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { CartComponent } from './cart/cart.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import hljs from 'highlight.js';
import { CheckoutComponent } from './checkout/checkout.component';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, CartComponent, HighlightModule, CheckoutComponent, ReactiveFormsModule, RouterModule],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          html: () => import('highlight.js/lib/languages/xml'),
          css: () => import('highlight.js/lib/languages/css'),
        }
      }
    }
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewChecked {

  name: string = 'Rajesh';
  number: number = +919897949596;
  skills: string[] = ['Java', 'SpringBoot', 'GIT'];
  show: boolean = false;
  topics: any = [];
  subTopics: any = [];
  dataDB: any = [];
  dataDI: any = [];
  compInteraction: any = [];
  formsData: any = [];
  routsData: any = [];

  imageUrl: string = "https://picsum.photos/200";
  imageWidth: number = 100;
  imageHeight: number = 100;
  userRole: string = "guest";
  country: string = "India";
  isCopy: boolean = false;
  receivedMsg: any;
  selectedTopic?: any;

  userName = "Mrunal"
  cartItems = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Smartphone", price: 20000 },
    { id: 3, name: "Headphones", price: 3000 },
    { id: 4, name: "Keyboard", price: 1500 },
    { id: 5, name: "Mouse", price: 800 }
  ]

  contact = {
    name: '',
    email: '',
    message: ''
  };

  contactFormD!: FormGroup;

  // Dynamic Form Field Config
  formFields = [
    { name: 'name', label: 'Name', type: 'text', validators: [Validators.required] },
    { name: 'email', label: 'Email', type: 'email', validators: [Validators.required] },
    { name: 'message', label: 'Message', type: 'textarea', validators: [Validators.required] },
  ];


  // @ViewChild('codeBlock', { static: false }) codeBlock!: ElementRef;
  @ViewChildren('codeBlock') codeBlocks!: QueryList<ElementRef>;


  constructor(private dataService:DataService, private router:Router) { }

  ngAfterViewChecked(): void {
    this.codeBlocks.forEach((block) => {
      hljs.highlightElement(block.nativeElement);
    });
  }

  ngOnInit() {
    this.topics = this.dataService.getTopics();
    // this.subTopics = this.dataService.getSubTopics();
    this.subTopics = [
      { topic:"Data Binding", subTopics:["Interpolation", "Property Binding", "Two Way Binding"]},
      { topic:"Depedency Injection"},
      { topic:"Pipes", subTopics:[]},
      { topic:"Directives", subTopics:[]},
      { topic:"Component Interaction", subTopics:[]},
      { topic:"Forms", subTopics:["Template Driven Forms", "Reactive Forms"]},
      { topic:"Routing", subTopics:["Type of Routes", "Route Params", "Query Params"]},
      { topic:"HTTP Client", subTopics:[]},
      { topic:"Observables/Promise", subTopics:[]},
      { topic:"Decorators", subTopics:[]},
      { topic:"Interceptors", subTopics:[]},
      { topic:"Lifecycle Hooks", subTopics:[]},
      { topic:"Content Projection", subTopics:[]},
      { topic:"Lazy Loading", subTopics:[]}
    ];
    this.dataDB = this.dataService.accordionData();
    this.dataDI = this.dataService.diAccordionData();
    this.compInteraction = this.dataService.componentInteractionData();
    this.formsData = this.dataService.getFormsData();
    this.routsData = this.dataService.getRoutsData();

    const formGroup: { [key: string]: FormControl } = {};
    this.formFields.forEach(field => {
      formGroup[field.name] = new FormControl('', field.validators);
    });

    this.contactFormD = new FormGroup(formGroup);
  }

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required),
  });

  onSubmitReactive() {
    if (this.contactForm.valid) {
      alert('Thank ' + this.contactForm.value.name + ' for contacting us!');
      this.contactForm.reset();
    }
  }
  onSubmitDynamic() {
    if (this.contactFormD.valid) {
      alert('Thank ' + this.contactFormD.value.name + ' for contacting us!');
      this.contactFormD.reset();
    }
  }


  onSubmit(form: any) {

    alert('Thank ' + form.value.name + ' for contacting us!');
    form.reset();
  }

  copyCode(id: any, code: any, data:any) {
    let selectedData;
    if(data=="DI"){
      selectedData = this.dataDI
    }else if(data=="DB"){ 
      selectedData = this.dataDB 
    }else if(data=="Forms"){
      selectedData = this.formsData
    }
    else{
      selectedData = this.compInteraction
    }
    if (code === "tscode") {
      navigator.clipboard.writeText(selectedData[id].tsCode);
      this.isCopy = true;
      setTimeout(() => {
        this.isCopy = false;
      }, 2000);
    } else if(code === "htmlcode") {
      navigator.clipboard.writeText(selectedData[id].htmlCode);
      this.isCopy = true;
      setTimeout(() => {
        this.isCopy = false;
      }, 2000);
    } else if(code === "tscode2"){
      navigator.clipboard.writeText(selectedData[id].tsCode2);
      this.isCopy = true;
      setTimeout(() => {
        this.isCopy = false;
      }, 2000);
    }else{
      navigator.clipboard.writeText(selectedData[id].service);
      this.isCopy = true;
      setTimeout(() => {
        this.isCopy = false; 
      }, 2000); 
    }
  }

  receiveMsg(msg: string) {
    this.receivedMsg = msg;
  }

  selectTopic(topic: string) {
    this.selectedTopic = topic;
    this.router.navigate([], { fragment: this.selectedTopic });
    const element = document.getElementById(this.selectedTopic);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  selectSubTopic(subTopic: string) {
    this.selectedTopic = subTopic;
    this.router.navigate([], { fragment: this.selectedTopic });
    const element = document.getElementById(this.selectedTopic);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  searchQuery: string = '';
  suggestions: any = []; 

  onSearch(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.searchQuery = input;

    if (this.searchQuery.trim() === '') {
      this.suggestions = [];
      return;
    }

    this.suggestions = this.subTopics
      .filter((topic: any) => 
      topic.topic.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      (topic.subTopics && topic.subTopics.some((subTopic: string) => subTopic.toLowerCase().includes(this.searchQuery.toLowerCase())))
      )
      .map((topic: any) => {
      return {
        topic: topic.topic,
        subTopics: topic.subTopics ? topic.subTopics.filter((subTopic: string) => subTopic.toLowerCase().includes(this.searchQuery.toLowerCase())) : []
      };
      });
      console.log(this.suggestions);
  }

  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const suggestionsElement = document.querySelector('.suggestionList');
    if (suggestionsElement && !suggestionsElement.contains(target)) {
      suggestionsElement.classList.add('fade-out');
      setTimeout(() => {
      this.suggestions = [];
      suggestionsElement.classList.remove('fade-out');
      }, 300); // Duration of the fade-out effect
    }
  }

  performSearch() {
    const matchingTopic = this.topics.find((topic: string) =>
      topic.toLowerCase() === this.searchQuery.toLowerCase()
    );

    if (matchingTopic) {
      this.selectTopic(matchingTopic);
      const element = document.getElementById(matchingTopic);
      if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      alert('No matching topic found!');
    }
  }
  navigate(path: string) {
    this.router.navigate([path]);
  }

}
