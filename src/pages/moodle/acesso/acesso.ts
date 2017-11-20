import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import {GetUsuario} from '../../../providers/get-usuario';
import {PRAUT} from '../../../providers/praut';
import {MoodlePage} from '../moodle';


@Component({ selector: 'page-acesso', templateUrl: 'acesso.html' })
export class AcessoPage {

  carregando : Loading;
  pegaCredenciais = { prontuario: '', senha: '' };
  public error: any;

  constructor(private navCtrl : NavController, private getUsuario : GetUsuario, private aut : PRAUT,
              private ac : AlertController, private loadingCtrl : LoadingController, public navParams : NavParams) {
    this.validarUsuario();
  }

  validarUsuario() {
    this.exibeCarregando();
    var usuario = JSON.parse(localStorage.getItem('currentUser'));

    if (usuario != null) {
      this.getUsuario.validaToken(usuario.token).subscribe(validou => {
        if (validou) {
          setTimeout(() => {
            this.carregando.dismiss();
            this.navCtrl.setRoot(MoodlePage);
          });
        } else {
          this.exibeErro("Token encontrado invalido!");
        }
      }, 
        error => { this.exibeErro(error); }
      ); 
      
    } else {
      this.carregando.dismiss();
      //this.exibeErro("Erro de token. Por favor, logue novamente.")
    }     
  }

  public autenticar() {
    this.exibeCarregando();
    this.aut.autenticarUsuario(this.pegaCredenciais).subscribe(autenticado => {
        if (autenticado) {
          setTimeout(() => {
            this.carregando.dismiss();
            this.navCtrl.setRoot(MoodlePage);
          });
        } else {
          this.exibeErro("Certifique-se dos dados informados.");
        }
      }, 
      error => { this.exibeErro(error); }
      );
  }

  exibeCarregando() {
    this.carregando = this.loadingCtrl.create({content: 'Por favor aguarde...'});
    this.carregando.present();
  }

  exibeErro(text) { 
    setTimeout(() => { this.carregando.dismiss(); });
    let alerta = this.ac.create({
      title: 'Falha de Autenticacao', 
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
