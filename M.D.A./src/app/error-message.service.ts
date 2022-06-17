import { Injectable } from '@angular/core';

@Injectable()
export class ErrorMessageService {
  public static errorMessage:string = "nothing";
  public static messageActive:boolean = false;
  static setError(errorMessage) :void {
    this.messageActive = true;
    this.errorMessage = errorMessage;
  }
  constructor() { }

}
