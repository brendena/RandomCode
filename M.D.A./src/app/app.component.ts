import {Component, trigger, state, style, transition, animate, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
   animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class AppComponent implements OnInit {
  title = 'app works!';
  menuState:string = 'out';

  ngOnInit(){

  }
  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
  onButtonClick(){
    this.title = "wowoowowo";
  }

  
  test(){
    console.log("test")

  }

}