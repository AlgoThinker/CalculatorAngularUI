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

  private url = 'http://localhost:9200/api-gateway/';  // URL to web api

  public show: boolean = false;
  public expr: string = '';
  public result: string = '';
  public resultExp: string = '';

  // public equalPressed: boolean = false;

  toggle() {
    this.show = !this.show;
  }

  //method for UI Mode 2 with full expression
  getResultExp(expression: string) {
    this.http.post<string>(this.url, expression).subscribe((val) => {
      this.resultExp = val;
    },
      response => {
        this.resultExp = "Invalid Input";
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }

  pressEqual(expression: string) {
    //  this.equalPressed = true;
    this.http.post<string>(this.url, expression).subscribe((val) => {
      this.result = val;
    },
      response => {
        //  this.result = 'Invalid Input';
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }

  pressPlus(expression: string) {
    this.http.post<string>(this.url, expression).subscribe((val) => {
      this.result = val+'+';
    },
      response => {
        //  this.result = 'Invalid Input';
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });

  }

  pressMinus(expression: string) {
    this.http.post<string>(this.url, expression).subscribe((val) => {
      this.result = val+'-';
    },
      response => {
        //  this.result = 'Invalid Input';
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });

  }

  pressMultiply(expression: string) {
    this.http.post<string>(this.url, expression).subscribe((val) => {
      this.result = val+'*';
    },
      response => {
        //  this.result = 'Invalid Input';
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });

  }

  pressDivide(expression: string) {
    this.http.post<string>(this.url, expression).subscribe((val) => {
      this.result = val+'/';
    },
      response => {
        //  this.result = 'Invalid Input';
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });

  }
}
