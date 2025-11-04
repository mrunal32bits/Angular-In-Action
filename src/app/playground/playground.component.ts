import { Component } from '@angular/core';
import { BidiModule } from '@angular/cdk/bidi';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { finalize, Subscription } from 'rxjs';

@Component({
  selector: 'app-playground',
  imports: [BidiModule,ScrollingModule,CommonModule],
  templateUrl: './playground.component.html',
  styleUrl: './playground.component.scss'
})
export class PlaygroundComponent {

  products: any[] = [];
  page = 1;
  limit = 50;
  loading = false;
  fileName:string = '';
  progress:number = 0;
  uploadSub:Subscription | undefined;
  showProgress:boolean = false;

  constructor(private productsService: DataService,private http:HttpClient) {
    this.loadMore();
  }

  loadMore() {
    if (this.loading) return;
    this.loading = true;

    this.productsService.getProducts(this.page, this.limit).subscribe((data) => {
      this.products = [...this.products, ...data];
      this.page++;
      this.loading = false;
    });
  }

  onScrolledIndexChange(index: number) {
    // When user scrolls near the end, load next page
    if (index +20 >= this.products.length) {
      this.loadMore();
    }
  }
  

  data = Array.from({ length: 100000 }).map((_, i) => ({
    id: i + 1,
    name: `Item #${i + 1}`
  }));

  fileUpload(event: any) {
    this.showProgress = true;
  const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();

            formData.append("file", file, this.fileName);

            const upload$ = this.http.post("https://api.escuelajs.co/api/v1/files/upload", formData,)
            .pipe(
                finalize(() => this.reset())
            );

            this.uploadSub = upload$.subscribe((event)=>{
                this.progress = 100;
            })
        }
  }

  cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  reset() {
    this.progress = 100;
    this.showProgress = false;
  }

}
