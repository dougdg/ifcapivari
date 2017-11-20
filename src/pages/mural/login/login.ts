import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, Loading, Platform } from 'ionic-angular';
import { PRAF } from "../../../providers/praf";
import { MuralPage } from "../mural";
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase/app';

@Component({selector: 'page-login', templateUrl: 'login.html'})
export class LoginPage {

  carregando : Loading;  
  public error: any;

  userProfile: any = null;

  constructor(public navp: NavParams, public navc: NavController, private ac : AlertController,
              public provAngularFire: PRAF, public lc : LoadingController, 
              public facebook: Facebook, private googlePlus: GooglePlus, private platform: Platform) {
    this.loginStatus();
  }

  loginStatus(){ console.log("---> loginStatus()");
    this.carregand();
    this.provAngularFire.angularFireAuth.authState.subscribe((auth) => {
        console.log("   ---> Chama Provider Angular Fire AuthState() : Checar Firebase Login");
        if(auth == null) {
          console.log("   <---  Deslogado");
          this.carregando.dismiss();       
        }
        else {
          this.carregando.dismiss();
          console.log("   <---  Logado : " + auth.displayName);
          this.provAngularFire.uid = auth.uid;
          this.provAngularFire.nome = auth.displayName;          
          if(auth.email == null){ this.provAngularFire.email = auth.providerData[0].email;             
          } else { this.provAngularFire.email = auth.email; }          
          this.provAngularFire.photo = auth.photoURL;
          
          localStorage.setItem('socialUser', JSON.stringify({uid: auth.uid, username: auth.displayName, email: auth.email, photo: auth.photoURL}));
          this.provAngularFire.addUser(auth.uid, auth.displayName, auth.email, auth.photoURL);
                    
          this.navc.setRoot(MuralPage); 
        }       
      }
    );  
  }

  /* --------- -------------- -------- */
  /* ---------  GOOGLE LOGIN  -------- */
  /* --------- -------------- -------- */

  googleLogin(): Promise<any> { console.log("---> googleLogin() ")
    if (this.platform.is('cordova')) { 
      return this.googlePlus.login({ 
          webClientId: '447120520041-eoh0s54jnh999kq8mkr22fg4p3djtg25.apps.googleusercontent.com', 
          offline: true
        }).then( response => {
            const googleCredential = firebase.auth.GoogleAuthProvider.credential(response.idToken);
            this.provAngularFire.angularFireAuth.auth.signInWithCredential(googleCredential)
              .then( success => {
                console.log(" --- GoogleAuthProvider.credential OK ---");
                this.navc.setRoot(MuralPage);              
              });
          })
            .catch((error: any) => { 
                if (error) { 
                  this.error = error; 
                  console.log("googleLogin error :" + this.error); 
                } 
            });

    } else {
      this.provAngularFire.googleLogin().then((logindata) => {
        console.log("          <--- Login com Google : " + logindata);
      })
        .catch((error: any) => { 
          if (error) { 
            this.error = error; 
            console.log("googleLogin error :" + this.error); 
          } 
        });
    }    
  }

  /* --------- -------------- -------- */
  /* --------- FACEBOOK LOGIN -------- */
  /* --------- -------------- -------- */

  facebookLogin(): Promise<any> { console.log("---> facebookLogin() "); 
    if (this.platform.is('cordova')) {      
          return this.facebook.login(['email'])
          .then( response => {            
            const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);      
            this.provAngularFire.angularFireAuth.auth.signInWithCredential(facebookCredential)
              .then( success => {           
                console.log(" --- FacebookAuthProvider.credential OK ---"); 
                this.navc.setRoot(MuralPage);
              });      
          })
            .catch((error: any) => { 
                if (error) { this.error = error; console.log("facebookLogin error :" + this.error); } });
   
    } else {
      this.provAngularFire.facebookLogin().then((logindata) => {
              console.log("              Login com Facebook : " + logindata);
          })
            .catch((error: any) => {
              if (error) { 
                this.error = error; 
                console.log("facebookLogin error :" + this.error); }
            });
    }
  }
  
  carregand() {
    this.carregando = this.lc.create({content: 'Por favor aguarde...'});
    this.carregando.present();
  }

  exibeErro(text) { 
    setTimeout(() => { this.carregando.dismiss(); });
    let alerta = this.ac.create({
      title: 'Está conectado?', 
      subTitle: text, 
      buttons: [
        { text:'OK', handler: () => {
          alerta.dismiss(); 
          return false; }
        }
      ]  
    });
    alerta.present();
  } 
}
