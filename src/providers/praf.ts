import {Injectable} from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class PRAF {

  public ofecaronas: FirebaseListObservable<any[]>;
  public ofemoradias: FirebaseListObservable<any[]>;

  public pedcaronas: FirebaseListObservable<any[]>;
  public pedmoradias: FirebaseListObservable<any[]>;

  public users: FirebaseListObservable<any[]>;
  public user: FirebaseObjectObservable<any[]>;

  authState: any = null;
  
  public nome : string;
  public email : string; 
  public uid : string;
  public photo : string;
  public error: any;
  
  constructor(public angularFireAuth: AngularFireAuth, public db: AngularFireDatabase) {
      this.angularFireAuth.authState.subscribe((auth) => { 
        if (auth != null) { 
            this.authState = auth;
            this.user = this.db.object('users/' + auth.uid); 
          } 
      });
      this.ofecaronas = this.db.list('ofecaronas');
      this.ofemoradias = this.db.list('ofemoradias');
      this.pedcaronas = this.db.list('pedcaronas');
      this.pedmoradias = this.db.list('pedmoradias');
      this.users = this.db.list('users'); 
  }

  googleLogin() { console.log("    ---> GoogleAuthProvider() "); 
    return this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(data => {
        console.log("     <--- Provider Google OK : " + data);
      })
        .catch((error: any) => { 
          if (error) { 
            this.error = error; 
            console.log("<!> GOOGLE LOGIN ERROR <!> " + this.error); 
          } 
        }); 
  }

  facebookLogin(){ console.log("     ---> FacebookAuthProvider() "); 
    return this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(data => {
        console.log("     <--- Provider Facebook OK : " + data);
      })
        .catch((error: any) => { 
          if (error) { 
            this.error = error; 
            console.log("<!> FACEBOOK LOGIN ERROR <!> " + this.error); 
          } 
        });
  }

  deslogar() { 
    localStorage.removeItem('socialUser');
    return this.angularFireAuth.auth.signOut(); 
  }

  addUser(uid, nome, email, photo) {
    let path = 'usuarios/' + uid; 
    let data = { name: nome, email: email, photoURL : photo};
    return this.db.object(path).update(data).catch(error => console.log(error));
  } 

  salvarCarona(novaCarona) {
    var carona = {
      nome: this.nome,  acao: novaCarona.acao,
      periodo: novaCarona.periodo,
      origem: novaCarona.origem,
      destino: novaCarona.destino,
      cel: novaCarona.cel, txt: novaCarona.txt
    };
    if(novaCarona.acao == "Oferecendo"){ this.ofecaronas.push(carona); }
    else{ this.pedcaronas.push(carona); }    
  }

  salvarMoradia(novaMoradia) {
    var moradia = {
      nome: this.nome, acao: novaMoradia.acao,
      periodo: novaMoradia.periodo,
      local: novaMoradia.local,
      cel: novaMoradia.cel, txt: novaMoradia.txt
    };
    if(novaMoradia.acao == "Oferecendo"){ this.ofemoradias.push(moradia); }
    else{ this.pedmoradias.push(moradia); }
  }

}
