import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, Validators } from '@angular/forms';


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
  public re = /[0-9]\.{0,1}[0-9]{0,}[\+\-\*\/][0-9]\.{0,1}[0-9]{0,}/;


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

    if (this.re.test(expression)) {
      this.http.post<string>(this.url, expression).subscribe((val) => {
        this.result = val + '+';
      },
        response => {
          //  this.result = 'Invalid Input';
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });

    } else {
      this.result = expression + '+';
    }


  }

  pressMinus(expression: string) {

    if (this.re.test(expression)) {
      this.http.post<string>(this.url, expression).subscribe((val) => {
        this.result = val + '-';
      },
        response => {
          //  this.result = 'Invalid Input';
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
    } else {
      this.result = expression + '-';
    }

  }

  pressMultiply(expression: string) {

    if (this.re.test(expression)) {
      this.http.post<string>(this.url, expression).subscribe((val) => {
        this.result = val + '*';
      },
        response => {
          //  this.result = 'Invalid Input';
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
    } else {
      this.result = expression + '*';
    }

  }

  pressDivide(expression: string) {
    if (this.re.test(expression)) {
      this.http.post<string>(this.url, expression).subscribe((val) => {
        this.result = val + '/';
      },
        response => {
          //  this.result = 'Invalid Input';
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
    } else {
      this.result = expression + '/';
    }

  }
}
