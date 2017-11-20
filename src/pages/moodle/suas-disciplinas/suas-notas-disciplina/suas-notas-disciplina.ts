import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import {ItemNota, GetSuasNotasDisciplina} from '../../../../providers/get-suas-notas-disciplina';

@Component({selector: 'page-suas-notas-disciplina', templateUrl: 'suas-notas-disciplina.html'})
export class SuasNotasDisciplinaPage {

  carregando : Loading;
  notas : ItemNota[];

  constructor(private navCtrl : NavController, private alertCtrl : AlertController, 
              private getSuasNotasDisciplina : GetSuasNotasDisciplina, 
              private loadingCtrl : LoadingController, 
              public navParams : NavParams) {

    this.exibirNotasDisciplina(navParams.data.iddisciplina);
  }

  ionViewDidLoad() { }

  exibirNotasDisciplina(iddisciplina){
    this.exibeCarregando(); 
    this.notas = [];
    this.getSuasNotasDisciplina.GetSuasNotasDisciplina(iddisciplina).subscribe(notasDisciplina => {
        if (notasDisciplina) {
          setTimeout(() => {
            console.log("notas:"); console.log(notasDisciplina);
            this.notas = notasDisciplina;
            this.carregando.dismiss();
          });
        } else {
            this.carregando.dismiss();
            this.exibeErro("Nao retornou nenhuma nota.");
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
    let alerta = this.alertCtrl.create({title: 'Falha ao exibir notas da disciplina.', subTitle: text, buttons: ['OK']});
    alerta.present();
  }

}
