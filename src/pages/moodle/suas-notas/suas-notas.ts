import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import {AlunoNota, GetNotas} from '../../../providers/get-notas';

@Component({selector: 'page-suas-notas', templateUrl: 'suas-notas.html'})
export class SuasNotasPage {

  carregando : Loading;
  notas : AlunoNota[];

  constructor(private navCtrl : NavController, private alertCtrl : AlertController, private getNotas : GetNotas,
              private loadingCtrl : LoadingController, public navParams : NavParams) {
    this.exibirnotas();
  }

  exibirnotas(){
    this.exibeCarregando(); 
    this.notas = [];
    this.getNotas.GetNotas().subscribe(notasRecebidas => {
        if (notasRecebidas) {
          setTimeout(() => {
            //console.log("notas:"); console.log(notasRecebidas);
            this.notas = notasRecebidas;
            this.carregando.dismiss();
          });
        } else {
            this.carregando.dismiss();
            this.exibeErro("Nao retornou nenhuma nota");
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
    let alerta = this.alertCtrl.create({title: 'Falha ao exibir notas', subTitle: text, buttons: ['OK']});
    alerta.present();
  }
}
