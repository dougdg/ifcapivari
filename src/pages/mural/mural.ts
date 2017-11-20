import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {PRAF} from '../../providers/praf';
import {HomePage} from '../home/home';


@Component({ templateUrl: 'ofecarona.html'}) // OFERECER CARONA
export class OfeCaronaPage {
  public caronas: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public praf: PRAF){
    this.caronas = this.praf.ofecaronas;
  }
}

@Component({ templateUrl: 'pedcarona.html'}) // PEDIR CARONA
export class PedCaronaPage {
  public caronas: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public praf: PRAF){
    this.caronas = this.praf.pedcaronas;
  }
}

@Component({ templateUrl: 'ofemoradia.html'}) // OFERECER MORADIA
export class OfeMoradiaPage {
  public moradias: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public praf: PRAF){
    this.moradias = this.praf.ofemoradias;
  }
}

@Component({ templateUrl: 'pedmoradia.html'}) // PEDIR MORADIA
export class PedMoradiaPage {
  public moradias: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public praf: PRAF){
    this.moradias = this.praf.pedmoradias;
  }
}


  /* --------- -------------- -------- */
  /* --------- FORM CARONA    -------- */
  /* --------- -------------- -------- */

@Component({ templateUrl: 'fcarona.html'})
export class FcaronaPage {

  masks: any; 
  cel: any = "";

  public carona = { acao: '', periodo: '', origem: '', destino: '', cel: '', txt: '' };

  constructor(public AF: PRAF, public navc: NavController, private alertCtrl : AlertController) {
    this.masks = { cel: ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] };
  }

  enviarCarona(){
    if(this.carona.acao == '' || this.carona.periodo == '' || this.carona.origem == '' ||
       this.carona.destino == '' || this.carona.cel == '') {
        let alerta = this.alertCtrl.create({
          title: 'Faltam dados!', 
          subTitle: 'Por favor, preecha os campos obrigatórios.', 
          buttons: ['OK']
        });
        alerta.present();
       }
       else{
        this.AF.salvarCarona(this.carona);
        this.carona = { acao: '', periodo: '', origem: '', destino: '', cel: '', txt: '' };
        this.voltarForm();
       }

  }
  voltarForm(){ this.navc.setRoot(MuralPage); }
}


  /* --------- -------------- -------- */
  /* --------- FORM MORADIA   -------- */
  /* --------- -------------- -------- */

@Component({ templateUrl: 'fmoradia.html'})
export class FmoradiaPage {

  masks: any; 
  cel: any = "";

  public moradia = { acao: '', periodo: '', local: '', cel: '', txt: '' };

  constructor(public AF: PRAF, public navc: NavController, private alertCtrl : AlertController) {
    this.masks = { cel: ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] };
  }

  enviarMoradia(){
    if(this.moradia.acao == '' || this.moradia.periodo == '' || 
       this.moradia.local == '' || this.moradia.cel == ''){
        let alerta = this.alertCtrl.create({
          title: 'Faltam dados!', 
          subTitle: 'Por favor, preecha os campos obrigatórios.', 
          buttons: ['OK']
        });
        alerta.present();
       }
       else{
        this.AF.salvarMoradia(this.moradia);
        this.moradia = { acao: '', periodo: '', local: '', cel: '', txt: '' };
        this.voltarForm();
       }

  }
  voltarForm(){ this.navc.setRoot(MuralPage); }
}



  /* --------- -------------- -------- */
  /* --------- PAGINA MURAL   -------- */
  /* --------- -------------- -------- */

@Component({selector: 'page-mural', templateUrl: 'mural.html'})
export class MuralPage {

  //carregando : Loading;
  public logado : boolean;
  public error: any;

  constructor(public navc: NavController, public praf : PRAF, public ac : AlertController) {}

  ofeCarona(){this.navc.push(OfeCaronaPage);}
  pedCarona(){this.navc.push(PedCaronaPage);}
  ofeMoradia(){this.navc.push(OfeMoradiaPage);}
  pedMoradia(){this.navc.push(PedMoradiaPage);}
  frmCarona(){this.navc.push(FcaronaPage);}
  frmMoradia(){this.navc.push(FmoradiaPage);}
  voltarInicio(){ this.navc.setRoot(HomePage); }
  
  deslogar(){ console.log("---> deslogando()  ");
    this.praf.deslogar().then((data) => {
      console.log("<--- Deslogou"); 
      localStorage.removeItem('socialUser');    
      this.voltarInicio();
    })
      .catch((error: any) => {
        if (error) { this.error = error; console.log("Deslogar :" + this.error); }
      });
  }
}
