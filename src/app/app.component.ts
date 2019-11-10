import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public show: boolean = false;
  public expr:string = '';
  
  

  toggle() {
   this.show = !this.show;
 }

 plusClick(expression:string){

 //  if(expression && expression != '' && expression == [0-9]* ){}
    
 }
}
