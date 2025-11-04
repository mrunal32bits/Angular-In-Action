import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartComponent } from './home/cart/cart.component';
import { CheckoutComponent } from './home/checkout/checkout.component';
import { ReportComponent } from './report/report.component';
import { MiniProjectsComponent } from './mini-projects/mini-projects.component';
import { RxJSComponent } from './rx-js/rx-js.component';
import { PlaygroundComponent } from './playground/playground.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'}, // Default route
    {path:'home', component: HomeComponent}, // Home route
    {path:'mini-projects', component: MiniProjectsComponent},
    {path:'rxjs', component:RxJSComponent},  
    {path:'playground',component:PlaygroundComponent},
    {
        path:'eCom',
        loadComponent: () => import('./e-com/e-com.component').then(m => m.EComComponent)}, // Lazy load 
    {
        path: 'home', // Nested route for home component
        children: [
            { path: 'cart', component: CartComponent }, // Child 1 Cart route
            { path: 'checkout', component: CheckoutComponent } // Child 2 Checkout route
        ]
    },
    {path: 'home/cart/:itemId', component: CartComponent}, // Parameterized route for cart component
    {path: 'report', component:ReportComponent},
    {
        path: 'ngrx-demo',
        loadComponent: () => import('./ngrx-demo/ngrx-demo.component').then(m => m.NgrxDemoComponent),
        children: [
            { path: '', loadComponent: () => import('./ngrx-demo/components/user-list/user-list.component').then(m => m.UserListComponent) },
            { path: 'user/:id', loadComponent: () => import('./ngrx-demo/components/user-detail/user-detail.component').then(m => m.UserDetailComponent) }
        ]
    },
    {
        path: 'jobportal',
        loadChildren: () => import('./jobportal/jobportal.module').then(m => m.JobportalModule) // Lazy load job portal module
    },
    {
        path: 'jobportal/login-page',
        loadComponent: () => import('./jobportal/login-page/login-page.component').then(m => m.LoginPageComponent)
    },
    {
        path: 'jobportal/landing-page',
        loadComponent: () => import('./jobportal/landing-page/landing-page.component').then(m => m.LandingPageComponent)
    },
    {
       path: 'jobportal/recruit',
       loadComponent: () => import('./jobportal/recuriter/recuriter.component').then(m => m.RecuriterComponent)
    },
    {path: '**', component:PageNotFoundComponent}, // Wildcard route 
];
