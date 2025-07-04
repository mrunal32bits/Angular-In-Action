import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API_URL = 'https://gvxkeiqldnrpnkdvqshh.supabase.co';
const HEADERS = {
  'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2eGtlaXFsZG5ycG5rZHZxc2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzUzNDYsImV4cCI6MjA2Mjk1MTM0Nn0.syNX2Bg9mpSlyNINgFchOIIsQ-nMKRDvKipTOnxOG70',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2eGtlaXFsZG5ycG5rZHZxc2hoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczNzUzNDYsImV4cCI6MjA2Mjk1MTM0Nn0.syNX2Bg9mpSlyNINgFchOIIsQ-nMKRDvKipTOnxOG70',
  'Content-Type': 'application/json'
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  [x: string]: any;

  private msgForSibling: string | undefined;

  constructor(private http:HttpClient) { }

  setMsgForSibling(msg: string) {
    this.msgForSibling = msg;
  }

  getMsgForSibling() {
    return this.msgForSibling;
  }

  jobsListData = [
    {
      id: 1,
      jobTitle: 'Software Engineer',
      companyName: 'TechCorp',
      location: 'New York, NY',
      salary: '120,000',
      jobDescription: 'Develop and maintain software applications.'
    },
    {
      id: 2,
      jobTitle: 'Product Manager',
      companyName: 'Innovate Ltd.',
      location: 'San Francisco, CA',
      salary: '110,000',
      jobDescription: 'Oversee product development and strategy.'
    },
    {
      id: 3,
      jobTitle: 'Data Analyst',
      companyName: 'DataWorks',
      location: 'Austin, TX',
      salary: '90,000',
      jobDescription: 'Analyze and interpret complex data sets.'
    },
    {
      id: 4,
      jobTitle: 'UX Designer',
      companyName: 'Creative Minds',
      location: 'Seattle, WA',
      salary: '85,000',
      jobDescription: 'Design user-friendly interfaces and experiences.'
    },
    {
      id: 5,
      jobTitle: 'DevOps Engineer',
      companyName: 'CloudOps',
      location: 'Boston, MA',
      salary: '115,000',
      jobDescription: 'Ensure smooth deployment and operation of systems.'
    },
    {
      id: 6,
      jobTitle: 'Marketing Specialist',
      companyName: 'Brandify',
      location: 'Chicago, IL',
      salary: '70,000',
      jobDescription: 'Develop and execute marketing campaigns.'
    },
    {
      id: 7,
      jobTitle: 'Cybersecurity Analyst',
      companyName: 'SecureNet',
      location: 'Denver, CO',
      salary: '100,000',
      jobDescription: 'Protect systems and networks from cyber threats.'
    },
    {
      id: 8,
      jobTitle: 'AI Researcher',
      companyName: 'FutureTech',
      location: 'Palo Alto, CA',
      salary: '130,000',
      jobDescription: 'Research and develop AI technologies.'
    },
    {
      id: 9,
      jobTitle: 'HR Manager',
      companyName: 'PeopleFirst',
      location: 'Atlanta, GA',
      salary: '95,000',
      jobDescription: 'Manage recruitment and employee relations.'
    },
    {
      id: 10,
      jobTitle: 'Financial Analyst',
      companyName: 'WealthCorp',
      location: 'Miami, FL',
      salary: '80,000',
      jobDescription: 'Analyze financial data and provide insights.'
    }
  ];

  getJobsList() {
    return this.http.get<any[]>(`${API_URL}/rest/v1/openJobs`, { headers: HEADERS });
  }
  setJobsList(data: any) {
    return this.http.post<any[]>(`${API_URL}/rest/v1/openJobs`, data, { headers: HEADERS }).subscribe(
      response => {
        console.log('Post successful:', response);
      },
      error => {
        console.error('Post failed:', error);
      }
    );
  }

  createRecruiterAccount(data: any) {
    return this.http.post<any>(`${API_URL}/rest/v1/recruiters`, data, { headers: HEADERS });
  }
  recruiterLogin(data: any) {
    return this.http.post<any>(`${API_URL}/rest/v1/recruiters`, data, { headers: HEADERS });
  }


  getTopics(){
    return [
      "Data Binding",
      "Depedency Injection",
      "Pipes",
      "Directives",
      "Component Interaction",
      "Forms",
      "Routing",
      "HTTP Client",
      "Observables/Promise",
      "Decorators",
      "Interceptors",
      "Lifecycle Hooks",
      "Content Projection",
      "Lazy Loading"
    ];
  }
  getSubTopics(){
    return [
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
  }


  

  accordionData(){
    return [
      {
        id: 0,
        title: "Interpolation - {{ }}",
        description: "Interpolation is a one-way data binding from the component to the view. It is denoted by double curly braces. The data inside the curly braces is the component property that we want to display in the view.",
        tsCode: `
    name: string = 'Rajesh';
    number: number = +919897949596;
    skills: string[] = ['Java', 'SpringBoot', 'GIT'];`,
        htmlCode: `
   <div class="output">
          Name: {{name}} <br>
          Number: {{number}} <br>
          Skills:
          <ul>
           <li *ngFor="let skill of skills">{{skill}}</li>
          </ul>
  </div>`,
        output: "interpolation"
      },
      {
        id: 1,
        title: "Property Binding - [ ]",
        description: "Property binding is a one-way data binding from the component to the view. It is denoted by square brackets. The data inside the square brackets is the component property that we want to bind to the view.",
        tsCode: `
    imageUrl: string = "https://picsum.photos/200";
    imageWidth: number = 100;
    imageHeight: number = 100;
    userRole: string = "guest";`,
        htmlCode: `
   <div class="output">
        <img [src]="imageUrl" [width]="imageWidth" [height]="imageHeight"/>
        <button [disabled]="userRole !== 'admin' ? true : false">
        Admin Action
        </button>
  </div>`,
        output: "propertyBinding"
      },
      {
        id: 2,
        title: "Two way Binding - [( )]",
        description: "Two-way data binding is a combination of event binding and property binding. It is denoted by square brackets and parentheses. It is used to update the view when the model changes and update the model when the view changes.",
        tsCode: `
    imageUrl: string = "https://picsum.photos/200";
    imageWidth: number = 100;
    imageHeight: number = 100;
    userRole: string = "guest";`,
        htmlCode: `
        <div class="output">
          <input type="text" [(ngModel)]="country"
           placeholder="Enter your country"/> 
          - {{country}}
        </div>`,
        output: "twoWayBinding"
      }
    ];
  }
  diAccordionData(){
    return [
      {
        id: 0,
        title: "Dependency Injection - Injecting Service into Component",
        description: "Here we providing list of topics from service to component. <br> 1. Create a service using CLI command: ng g s data <br>It will create class with @Injectable with <b>provideIn:'root'</b> by default(available everywhere). You can change to <b> provideIn: ModuleName </b> (specific to module)  or <b> providers:[DataService]</b> (DataService can be used by components having it thier providers list - create new instance of Dataservice for every component) <br> 2. Import the service in the component and inject it in the constructor. <br> 3. Call the service method in ngOnInit() lifecycle hook to get the topics.",
        tsCode: `
    import { DataService } from '../data.service';
    topics: any = [];

    constructor(private dataService:DataService) { }

    ngOnInit() {
      this.topics = this.dataService.getTopics();
    }`,
        service: `
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }
  getTopics(){
    return [
      "Data Binding",
      "Depedency Injection",
      "Pipes",
      "Directives"
    ];
    }}`,
        output: "dependencyInjection"
      }
    ];
  }

  componentInteractionData(){
    return [
      {
        id: 0,
        title: "Parent to Child - @Input()",
        description: "Here we sending data from Parent to Child component. <br> 1. Declare and Assign Values to Variables in Parent Component which you want to send to Child <br> 2. Assign this variable in child selecteor in Parent HTML using this Syntax - <b>[childVar]='parentVar'</b> <br> 3. In Child Component, declare the variable with @Input() decorator. <br> 4. Use this variable in Child HTML.",
        tsCodeHead: "cart.component.ts (child.ts)",
        tsCode: `
        import { Input } from '@angular/core';
        export class CartComponent {
            @Input() msg!:string;
            @Input() cartName!: string;
            @Input() item: any;
       }`,
        htmlCodeHead: "home.component.html (parent.html)",
        htmlCode: `
        <div class="output">
                  <app-cart [cartName]="userName" 
                  [items]="cartItems" 
                  [msg]="'Hello from Parent'">
                  </app-cart>
         </div>`,
         tsCode2Head:"home.component.ts (parent.ts)",
         tsCode2:`  
         export class HomeComponent {
         userName = "Mrunal"
         cartItems = [
                { id: 1, name: "Laptop", price: 50000 },
                { id: 2, name: "Smartphone", price: 20000 },
                { id: 3, name: "Headphones", price: 3000 },
                { id: 4, name: "Keyboard", price: 1500 },
                { id: 5, name: "Mouse", price: 800 }]
        }`,
        output: "inputPC"
      },
      {
        id: 1,
        title: "Child to Parent - @Output()",
        description: "Here we sending data from Child to Parent component. <br> 1. Define @Output() Variable in Child Component of EventEmitter Type. <br> 2. Emit the Data using this Syntax - <b>this.varibaleName.emit('message')</b> <br> 3. In Parent Component HTML, assign variableName (declared in child) to any function in child selector - <b> (varibaleName)='reciveMsg(event)' </b> <br> 4. In Parent Component, declare the function to receive the data and assign it to a variable.",
        tsCodeHead: "cart.component.ts (child.ts)",
        tsCode: `
        import { Input } from '@angular/core';
        export class CartComponent {
             @Output() notification = new EventEmitter<string>();
             // Call this function on any event like button click, change etc.
              sendMessage() {
                this.notification.emit("Hello from Child");
              }
            
       }`,
       htmlCodeHead: "home.component.html (parent.html)",
       htmlCode: `
             <div class="output">
                  <app-cart (notification)="receiveMsg(event)"></app-cart>
                  <div>Message from Child - {{receivedMsg}}</div>
                </div>`,
       tsCode2Head: "home.component.ts (parent.ts)",
       tsCode2:`  
         export class HomeComponent {
         
           receiveMsg(msg: string) {
           this.receivedMsg = msg;
           // Use this variable in HTML to display the message
      }
  }`,
        output: "outputPC"
      },
      {
        id: 2,
        title: "Sibling Component Communication - Service",
        description: "Here we sending data from Cart to Checkout component  using Service. <br> 1. Define @Output() Variable in Child Component of EventEmitter Type. <br> 2. Emit the Data using this Syntax - <b>this.varibaleName.emit('message')</b> <br> 3. In Parent Component HTML, assign variableName (declared in child) to any function in child selector - <b> (varibaleName)='reciveMsg(event)' </b> <br> 4. In Parent Component, declare the function to receive the data and assign it to a variable.",
        tsCodeHead: "cart.component.ts (sibling1.ts)",
        tsCode: `
        import { DataService } from '../../data.service';
        export class CartComponent {
            
        msgForSibling: string = "Hello from Cart to Checkout";
         
        constructor(private dataService:DataService) {}
       
        sendMessageToSibling() {
         this.dataService.setMsgForSibling(this.msgForSibling);
  }
            
       }`,
       tsCode2Head: "checkout.component.ts (sibling2.ts)",
       tsCode2: `
             import { DataService } from '../../data.service';
export class CheckoutComponent {

  msg?: string;

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.msg = this.dataService.getMsgForSibling();
  }

}`,
        serviceHead: "data.service.ts (service.ts)",
         service:`  
        export class DataService {

        private msgForSibling: string | undefined;

        setMsgForSibling(msg: string) {
            this.msgForSibling = msg;
        }
        getMsgForSibling() {
            return this.msgForSibling;
        }
      }`,
        output: "sibling"
      }
    ];
  }

  getFormsData(){
    return [
      {
        id: 0,
        title: "Template Driven Forms (TDF)",
        description:"Template-driven forms are forms where the form controls are defined in the template. <br> 1. Import FormsModule in app.module.ts <br> 2. Use ngModel directive to bind the form controls to the component properties. <br> 3. Use ngForm directive to create a form group. <br> 4. Use ngSubmit directive to handle form submission.",
        tsCodeHead: "component.ts",
        tsCode: `
        export class AppComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };
  onSubmit(form: any) {
    console.log('Form Submitted:', form.value);
    alert('Thank you for contacting us!');
    form.reset();
  }
}`,
        htmlCodeHead: "component.html",
        htmlCode: `
                 <div class="output">
                  <h2>Contact Us</h2>
                  <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)">
                    <div>
                      <label>Name:</label>
                      <input type="text" name="name" [(ngModel)]="contact.name" required />
                    </div>
                    <div>
                      <label>Email:</label>
                      <input type="email" name="email" [(ngModel)]="contact.email" required />
                    </div>
                    <div>
                      <label>Message:</label>
                      <textarea name="message" [(ngModel)]="contact.message" required></textarea>
                    </div>
                    <button type="submit" [disabled]="!contactForm.valid">Submit</button>
                  </form>                  
                </div>`,
        output: "TDF"
      },
      {
        id: 1,
        title: "Reactive Forms",
        description:"Reactive forms are forms where the form controls are defined in the component. <br> 1. Import ReactiveFormsModule in app.module.ts <br> 2. Create a FormGroup and FormControl in the component. <br> 3. Use formGroup directive to bind the form group to the template. <br> 4. Use formControlName directive to bind the form controls to the template.",
        tsCodeHead: "component.ts",
        tsCode: `
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
  }`,
        htmlCodeHead: "component.html",
        htmlCode: `
             <div class="output">
                  <h2>Contact Us</h2>
                  <form [formGroup]="contactForm" (ngSubmit)="onSubmitReactive()">
                    <div>
                      <label>Name:</label>
                      <input type="text" formControlName="name" />
                    </div>
                    <div>
                      <label>Email:</label>
                      <input type="email" formControlName="email" />
                    </div>
                    <div>
                      <label>Message:</label>
                      <textarea formControlName="message"></textarea>
                    </div>
                    <button type="submit" [disabled]="!contactForm.valid">Submit</button>
                  </form>                  
                </div>`,
        output: "Reactive"
      },
      {
        id: 2,
        title: "Dynamic Reactive Forms",
        description:"Dynamic reactive forms are forms where the form controls are created dynamically based on the configuration. <br> 1. Import ReactiveFormsModule in app.module.ts <br> 2. Create a FormGroup and FormControl in the component. <br> 3. Use formGroup directive to bind the form group to the template. <br> 4. Use formControlName directive to bind the form controls to the template.",
        tsCodeHead: "component.ts",
        tsCode: `
          export class AppComponent implements OnInit {
  contactFormD!: FormGroup;

  // Dynamic Form Field Config
  formFields = [
    { name: 'name', label: 'Name', type: 'text', validators: [Validators.required] },
    { name: 'email', label: 'Email', type: 'email', validators: [Validators.required] },
    { name: 'message', label: 'Message', type: 'textarea', validators: [Validators.required] },
  ];

  ngOnInit() {
    const formGroup: { [key: string]: FormControl } = {};
    this.formFields.forEach(field => {
      formGroup[field.name] = new FormControl('', field.validators);
    });

    this.contactFormD = new FormGroup(formGroup);
  }

    onSubmitDynamic() {
    if (this.contactFormD.valid) {
      alert('Thank ' + this.contactFormD.value.name + ' for contacting us!');
      this.contactFormD.reset();
    }
  }
  }
`,
        htmlCodeHead: "component.html",
        htmlCode: `
           <div class="output">
                  <h2>Contact Us</h2>
                  <form [formGroup]="contactForm" (ngSubmit)="onSubmitDynamic()">
                    <div *ngFor="let field of formFields">
                      <label>{{ field.label }}:</label>
                      <input
                        *ngIf="field.type !== 'textarea'"
                        [type]="field.type"
                        [formControlName]="field.name"
                      />
                      <textarea
                        *ngIf="field.type === 'textarea'"
                        [formControlName]="field.name"
                      ></textarea>  
                    </div>
                    <button type="submit" [disabled]="!contactForm.valid">Submit</button>
                  </form>                  
                </div>`,
        output: "Dynamic"
      }
    ];
  }

  getRoutsData(){
    return[
      {
        id: 0,
        title: "Type of Routes",
        description:"There are 4 types of routes in Angular. <br> 1. Default Route - Redirects to a specific route when the application loads. <br> 2. Lazy Load Route - Loads a module only when it is required. <br> 3. Wildcard Route - Redirects to a specific route when the URL does not match any of the defined routes. <br> 4. Child Route - Defines child routes for a specific parent route.",
        tsCodeHead: "app.route.ts",
        tsCode: `
            {path: '', redirectTo: 'home', pathMatch: 'full'}, // Default route
            {path:'home', component: HomeComponent}, // Home route
            {
                path: 'home', // Nested route for home component
                children: [
                    { path: 'cart', component: CartComponent }, // Child 1 Cart route
                    { path: 'checkout', component: CheckoutComponent } // Child 2 Checkout route
                ]
            },
            {path: '**', component:PageNotFoundComponent}, // Wildcard route 
        `,
        htmlCodeHead: "component.html",
        htmlCode: `
         <div class="output">
                  <button><a routerLink="/homee">Wildcart URL - When we hit Wrong URL</a></button>
                  <button><a routerLink="/home">Default Route - Deafult route in app loads first time</a></button>
                  <button><a routerLink="/home/cart">Child 1 Route - Child of Home</a></button>
                  <button><a routerLink="/home/checkout">Child 2 Route - Child of Home</a></button>
         </div>
          `,
        output: "RouteType"
      },
      {
        id: 1,
        title: "Route Params",
        description:" Route params are used to pass parameters in the URL. <br> 1. Define the route with a parameter in the app.route.ts file. <br> 2. Use the routerLink directive to pass the parameter in the URL. <br> 3. Use the ActivatedRoute service to get the parameter in the component.",
        tsCodeHead: "app.route.ts",
        tsCode: `
export const routes: Routes = [

    {path: 'cart/itemId', component: CartComponent}, // Parameterized route for cart component
];
        `,
        tsCode2Head: "cart.component.ts",
        tsCode2:`
          itemId!: number;
  itemsList =  [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Smartphone", price: 20000 },
    { id: 3, name: "Headphones", price: 3000 },
    { id: 4, name: "Keyboard", price: 1500 },
    { id: 5, name: "Mouse", price: 800 },
  ]
  selectedItem: any = [];
    ngOnInit() {
    this.itemId = this.activeRoute.snapshot.params['itemId'];
    if (this.itemId) {
      this.selectedItem = this.itemsList.filter((item: any) => item.id === this.itemId);
    }
  }
 `,
        htmlCodeHead: "cart.component.html",
        htmlCode: `
         <div *ngIf="selectedItem.length > 0">
        <p>Item Id passed in Route - {{itemId}}</p>
        <p>Items whose ID maths to itemId passed in Route Param</p>
        <div *ngFor="let item of selectedItem">
            <p>{{item.name}} - {{item.price}}</p>
        </div>
    </div>
          `,
        output: "RouteParam"
      },
      {
        id: 2,
        title: "Query Paramnets",
        description:"Query Params are used to pass parameters in the URL. <br> 1. Define the route with a parameter in the app.route.ts file. <br> 2. Use the routerLink directive to pass the parameter in the URL. <br> 3. Use the ActivatedRoute service to get the parameter in the component.",
        tsCodeHead: "app.route.ts",
        tsCode: `
export const routes: Routes = [

    {path: 'cart/itemId', component: CartComponent}, // Parameterized route for cart component
];
        `,
        tsCode2Head: "cart.component.ts",
        tsCode2:`
          itemId!: number;
  itemsList =  [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Smartphone", price: 20000 },
    { id: 3, name: "Headphones", price: 3000 },
    { id: 4, name: "Keyboard", price: 1500 },
    { id: 5, name: "Mouse", price: 800 },
  ]
  selectedItem: any = [];
    ngOnInit() {
    this.itemId = this.activeRoute.snapshot.params['itemId'];
    if (this.itemId) {
      this.selectedItem = this.itemsList.filter((item: any) => item.id === this.itemId);
    }
  }
 `,
        htmlCodeHead: "cart.component.html",
        htmlCode: `
         <div *ngIf="selectedItem.length > 0">
        <p>Item Id passed in Route - {{itemId}}</p>
        <p>Items whose ID maths to itemId passed in Route Param</p>
        <div *ngFor="let item of selectedItem">
            <p>{{item.name}} - {{item.price}}</p>
        </div>
    </div>
          `,
        output: "QueryParam"
      }
    ]
  }
}
