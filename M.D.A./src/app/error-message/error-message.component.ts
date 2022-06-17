import { Component, OnInit } from '@angular/core';
import { ErrorMessageService } from '../error-message.service';
@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  constructor() { }
  eMessage = ErrorMessageService.errorMessage;
  ngOnInit() {
  }
  test(){
    console.log("test")
    ErrorMessageService.errorMessage = "what";
  }
}
