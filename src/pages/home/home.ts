import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import { Market } from '@ionic-native/market';
import {AcessoPage} from '../moodle/acesso/acesso';
import {NoticiasPage} from '../noticias/noticias';
import {LoginPage} from '../mural/login/login';
import {GetUsuario} from '../../providers/get-usuario';
import {Noticia, GetNoticias} from '../../providers/get-noticias';
import {PRAF} from "../../providers/praf";
//import 'rxjs/Rx';

@Component({ templateUrl: 'artigo.html'})
export class ArtigoHomePage {
  item;
  constructor(params: NavParams) {
     this.item = params.data.item;
  }
}

@Component({ templateUrl: 'facebook.html'})
export class FacebookPage {
  constructor() {}
}

@Component({ templateUrl: 'faceteca.html'})
export class FacetecaPage {
  constructor() {}
}

@Component({ templateUrl: 'sobre.html'})
export class SobrePage {
  constructor() {}
}

@Component({ selector: 'page-home', templateUrl: 'home.html' })
export class HomePage {
  carregando : Loading;
  nome : string;
  foto : string;
  email : string;
  user : string;
  noticias : Noticia[];
  username: string;
  photo: string;

  constructor(public navCtrl : NavController, private getUsuario : GetUsuario, 
              private alertCtrl : AlertController, private loadingCtrl : LoadingController,
              private getNoticias : GetNoticias, public provAngularFire: PRAF,
              public navParams : NavParams, public market : Market) {
    this.checaUsuario();
    this.exibirNoticias();
    //this.afLoginStatus();
  }

  checaUsuario() { console.log("---> Checando usuario moodle");
    var usuario = JSON.parse(localStorage.getItem('currentUser'));
    var social = JSON.parse(localStorage.getItem('socialUser')); 
    var moodle = JSON.parse(localStorage.getItem('moodleUser')); 

    if(moodle != null){
      this.nome = moodle.nome
      this.foto = moodle.foto;
      this.user = moodle.username;
      this.email = moodle.email;
    } else {
      if (usuario != null) {
        this.getUsuario.getUsuario(usuario.token).subscribe(dadosUsuario => {
             if (dadosUsuario) {
               setTimeout(() => {
                 this.nome = dadosUsuario.firstname + " " + dadosUsuario.lastname;
                 this.foto = dadosUsuario.image;
                 this.user = dadosUsuario.username;
                 this.email = dadosUsuario.email;
                 console.log("<--- Moodle logado : " + this.nome);
               });
             } else {
               console.log("<--- Usuario nao encontrado");
               this.exibeErro("Usuario não encontrado.");
             }
           }, 
           error => { this.exibeErro(error); }
         ); 
      }
    }
    if (social != null){
      this.username = social.username;
      this.photo = social.photo;
    }    
  }

  exibirNoticias(){ console.log("---> Carregando noticias");
    this.exibeCarregando(); 
    this.noticias = [];
    this.getNoticias.getNoticias("5").subscribe(noticiasRecebidas => {
        if (noticiasRecebidas) {
          setTimeout(() => {
            this.noticias = noticiasRecebidas;
            this.carregando.dismiss();
            console.log("<--- Noticias carregadas");
          });
        } else {
            this.carregando.dismiss();
            this.exibeErro("Notícias não encontradas.");
            console.log("<--- Notícias não encontradas.");
        }
      }, 
       error => { this.exibeErro(error); }
      );  
  }

  afLoginStatus(){ console.log("---> Home AF Login Status ");
    this.provAngularFire.angularFireAuth.authState.subscribe((auth) => {  });   
  }

  irMoodle(){ this.navCtrl.setRoot(AcessoPage); } 

  abrirArtigo(item){ this.navCtrl.push(ArtigoHomePage, { item: item }); } 
  verNoticias(){ this.navCtrl.setRoot(NoticiasPage); }

  muralPage(){ this.navCtrl.setRoot(LoginPage); }

  faceBook(){ this.navCtrl.push(FacebookPage); }
  faceTeca(){ this.navCtrl.push(FacetecaPage); }

  sobrePage(){ this.navCtrl.push(SobrePage); }

  avaliarApp(){
    // id '447120520041'
    // pkg 'com.dougdiez.ifbook.dev'
    return this.market.open('com.dougdiez.ifbook.dev');
  }

  exibeCarregando() {
    this.carregando = this.loadingCtrl.create({content: 'Por favor aguarde...'});
    this.carregando.present();
  }

  exibeErro(text) { 
    setTimeout(() => { this.carregando.dismiss(); });
    let alerta = this.alertCtrl.create({title: 'Está conectado?', subTitle: text, buttons: ['OK']});
    alerta.present();
  }  
}
