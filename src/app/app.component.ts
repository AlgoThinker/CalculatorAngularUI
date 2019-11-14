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
  //public reNegative = /[0-9]{1,}[\-]{1,1}[0-9]\.{0,1}[0-9]{0,}/;
  
 // public checkRe = /[\+\-\*\/\(\s]{1,}[\-]{1,1}[0-9]\.{0,1}[0-9]{0,}/;

  public checkRe =  /[\+\-\*\/\(\s]{1,}[\-]{1,1}[0-9]{1,}\.{0,1}[0-9]{0,}/;


  // public equalPressed: boolean = false;

  toggle() {
    this.show = !this.show;
  }

  //method for UI Mode 2 with full expression


  preProcessStr(expre:string): string{

    let temp = expre.replace(/ /,'');
    let temporary = ' '+temp;

    let expression = temporary.replace(this.checkRe, function (x) {
    //  let someStr = x.charAt(0) + '(0-' + x.substr(2,) + ')';
    let reNegativeNumber = /[\-]{1,1}[0-9]{1,}\.{0,1}[0-9]{0,}/;
      let someStr = x.replace(reNegativeNumber, function(y){
        return '(0-'+y.substr(1,)+')';
      });
      return someStr;
    });

    return expression;
  
  }

  getResultExp(expre: string) {

    // let expression.match(/[\-]{1,1}[0-9]\.{0,1}[0-9]{0,}/g);

    // str.replace(/blue/g, "red");

    let expression = this.preProcessStr(expre);

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

  pressEqual(expre: string) {
    //  this.equalPressed = true;

    let expression = this.preProcessStr(expre);
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

  pressPlus(expre: string) {

    let expression = this.preProcessStr(expre);

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

  pressMinus(expre: string) {

    let expression = this.preProcessStr(expre);

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

  pressMultiply(expre: string) {

    let expression = this.preProcessStr(expre);

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

  pressDivide(expre: string) {

    let expression = this.preProcessStr(expre);

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
