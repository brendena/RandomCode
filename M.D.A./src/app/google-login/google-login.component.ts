import { Component, OnInit, NgZone, Input } from '@angular/core';
import { MyOauthService } from '../my-oauth.service';
import { MyKeysService } from '../myKeys.service'
import {ErrorMessageService} from '../error-message.service';

/*
code came from
https://stackoverflow.com/questions/35530483/google-sign-in-for-websites-and-angular-2-using-typescript

*/
@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss']
})
export class GoogleLoginComponent implements OnInit {
  initAPI;
  constructor(private _ngZone: NgZone) { }
  ngOnInit()
  {
    console.log("on init gogole -log in")
    this.initAPI = new Promise(
        (resolve) => {
          window['onLoadGoogleAPI'] =
              () => {                
                  resolve((<any>window).gapi); //allows me to do anything i want
          };
          this.init();
        }
    )
  }
  /*
  loads the gapi
  */
  init(){
    let meta = document.createElement('meta');
    meta.name = 'google-signin-client_id';
    meta.content = MyKeysService.client_id;
    document.getElementsByTagName('head')[0].appendChild(meta);
    let node = document.createElement('script');
    node.src = 'https://apis.google.com/js/platform.js?onload=onLoadGoogleAPI';
    node.type = 'text/javascript';
    node.onload = () =>{
      (<any>window).gapi.load('auth', {'callback': ()=>{console.log("loaded the auth")}  });
      (<any>window).gapi.load('picker', {'callback': ()=>{console.log("loaded the picker")} });
    }
    document.getElementsByTagName('body')[0].appendChild(node);
  }


  ngAfterViewInit() {
    this.initAPI.then(
      (gapi) => {
        gapi.load('auth2', () =>
        {
          /*set up event handlers for signing it*/ 
          gapi.auth2.init({
            client_id: MyKeysService.client_id,
            //cookiepolicy: 'single_host_origin',
            discoveryADocs:[MyKeysService.discoveryADocs],
            scope: MyKeysService.scope
          }).then((auth2)=>{
            auth2.attachClickHandler(document.getElementById('googleSignInButton'), {},
              this.onSuccess,
              this.onFailure
            );
          });
          /*set up oauth tokens*/ 
          gapi.auth2.authorize(
          {
            client_id: MyKeysService.client_id,
            discoveryADocs:[MyKeysService.discoveryADocs],
            scope: MyKeysService.scope
          },
          (authResult)=>{
            console.log(authResult)
            if (authResult && !authResult.error) {
              console.log(authResult.access_token);
              MyOauthService.oauthToken = authResult.access_token;
              
            }
          });



        });
      }
    )
  }
  logOut(){
    (<any>window).gapi.auth2.getAuthInstance().signOut().then(()=>{
        console.log("logged in state false = logout: " + (<any>window).gapi.auth2.getAuthInstance().isSignedIn.get());
    });
    
  }
  onSuccess = (user) => {
      this._ngZone.run(
          () => {
              if(user.getAuthResponse().scope ) {
                  console.log("everthing Worked")
                  //Store the token in the db
                  //this.socialService.googleLogIn(user.getAuthResponse().id_token)
              } else {
                 console.log("there was a problem")
                //this.loadingService.displayLoadingSpinner(false);
              }
          }
      );
  };

  onFailure = (error) => {
    console.log(error);
    ErrorMessageService.setError(error);
    /*
    this.loadingService.displayLoadingSpinner(false);
    this.messageService.setDisplayAlert("error", error);
    this._ngZone.run(() => {
        //display spinner
        this.loadingService.displayLoadingSpinner(false);
    });
    */
  }
}
