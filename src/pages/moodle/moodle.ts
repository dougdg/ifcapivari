import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import {GetUsuario} from '../../providers/get-usuario';
import {SuasDisciplinasPage} from './suas-disciplinas/suas-disciplinas';
import {SuasNotasPage} from './suas-notas/suas-notas';
import {DocentesPage} from './docentes/docentes';
import {HomePage} from '../home/home';

import 'rxjs/Rx';

@Component({templateUrl: 'usuario.html'})
export class UsuarioPage {
  id;
  username;
  firstname;
  lastname;
  email;
  city;
  image;

  constructor(params: NavParams) {
    this.id = params.data.dadosUsuario.id;
    this.username = params.data.dadosUsuario.username;
    this.firstname = params.data.dadosUsuario.firstname;
    this.lastname = params.data.dadosUsuario.lastname;
    this.email = params.data.dadosUsuario.email;
    this.city = params.data.dadosUsuario.city;
    this.image = params.data.dadosUsuario.image;
  }
}

@Component({selector: 'page-moodle', templateUrl: 'moodle.html'})

export class MoodlePage {
  carregando : Loading;

  constructor(public navCtrl : NavController, private getUsuario : GetUsuario, private ac : AlertController, 
              private loadingCtrl : LoadingController, public navParams : NavParams) {}

  exibirUsuario() {
    var usuario = JSON.parse(localStorage.getItem('currentUser'));
    if (usuario != null) {
      this
        .getUsuario
        .getUsuario(usuario.token)
        .subscribe(dadosUsuario => {
          if (dadosUsuario) {
            setTimeout(() => {
              //console.log("Dados do Usuario no moodle:"); console.log(dadosUsuario);
              this.navCtrl.push(UsuarioPage, { dadosUsuario: dadosUsuario });

            });
          } else {
            this.exibeErro("Usuario nao recebido do getUsuario");
          }
        }, error => {
          this.exibeErro(error);
        });
    }
  }

  exibirSuasDisciplinas(){
    this.navCtrl.push(SuasDisciplinasPage);
  }

  exibirSuasNotas(){
    this.navCtrl.push(SuasNotasPage);
  }

  irDocentes(){
    var usuario = JSON.parse(localStorage.getItem('currentUser'));
    if (usuario != null) {
      this
        .getUsuario
        .getUsuario(usuario.token)
        .subscribe(dadosUsuario => {
          if (dadosUsuario) {
            setTimeout(() => {
              this.navCtrl.push(DocentesPage, { dadosUsuario : dadosUsuario });
            });
          } else {
            this.exibeErro("Usuario nao recebido do getUsuario");
          }
        }, error => {
          this.exibeErro(error);
        });
    }    
  } 
  
  deslogar(){ 
    localStorage.removeItem('currentUser');
    localStorage.removeItem('moodleUser');
    this.voltarInicio();
  }
  
  voltarInicio(){
    this.navCtrl.setRoot(HomePage);
  }

  exibeCarregando() {
    this.carregando = this.loadingCtrl.create({content: 'Por favor aguarde...'});
    this.carregando.present();
  }

  exibeErro(text) {
    setTimeout(() => {
      this.carregando.dismiss();
    });
    let alerta = this.ac.create({title: 'Falha de Autenticacao', subTitle: text, buttons: ['OK']});
    alerta.present();
  }
}
