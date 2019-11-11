import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private http: HttpClient) { }

  public show: boolean = false;
  public expr: string = '';
  public result: any = '';
  public resultExp: any = '';
  private url = 'http://localhost:9200/api-gateway/';  // URL to web api

  getResult(expression: string) {
    this.http.post<string>(this.url, expression).subscribe((val) => {
      this.result = val;
    },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }

  getResultExp(expression: string) {
    this.http.post<string>(this.url, expression).subscribe((val) => {
      this.resultExp = val;
    },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }


  toggle() {
    this.show = !this.show;
  }

  plusClick(expression: string) {

    //  if(expression && expression != '' && expression == [0-9]* ){}

  }
}
