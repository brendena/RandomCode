import { Component, OnInit } from '@angular/core';
import { MyOauthService } from '../my-oauth.service';
import { MyKeysService } from '../myKeys.service';

/*
https://developers.google.com/picker/docs/
*/
@Component({
  selector: 'app-google-picker',
  templateUrl: './google-picker.component.html',
  styleUrls: ['./google-picker.component.scss']
})
export class GooglePickerComponent implements OnInit {

  constructor() { }
  ngOnInit() {
  }
  test(){
    console.log(MyOauthService.oauthToken)
    console.log( (<any>window).google)
    var picker = new  (<any>window).google.picker.PickerBuilder().
              addView((<any>window).google.picker.ViewId.SPREADSHEETS).
              setOAuthToken(MyOauthService.oauthToken).
              setDeveloperKey(MyKeysService.developerKey).
              setCallback(this.pickerCallback).
              build();
    picker.setVisible(true);
  }
  pickerCallback(data) {
    var url = 'nothing';
    if (data[ (<any>window).google.picker.Response.ACTION] ==  (<any>window).google.picker.Action.PICKED) {
      var doc = data[ (<any>window).google.picker.Response.DOCUMENTS][0];
      url = doc[ (<any>window).google.picker.Document.URL];
    }
    var message:string = 'You picked: ' + url;
    //document.getElementById('result').innerHTML = message;
    console.log(message)
  }
}
