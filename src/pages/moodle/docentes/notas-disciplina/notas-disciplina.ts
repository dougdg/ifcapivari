import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import {Aluno, GetNotasDisciplina} from '../../../../providers/get-notas-disciplina';

@Component({selector: 'page-notas-disciplina', templateUrl: 'notas-disciplina.html'})
export class NotasDisciplinaPage {

  carregando : Loading;
  alunos : Aluno[];
  
  constructor(private navCtrl : NavController, private alertCtrl : AlertController, 
              private getNotasDisciplina : GetNotasDisciplina, 
              private loadingCtrl : LoadingController, 
              public navParams : NavParams) {

    this.exibirNotasDisciplina(navParams.data.iddisciplina);
  }

  exibirNotasDisciplina(iddisciplina){
    //console.log("iddisciplina:" + iddisciplina);
    this.exibeCarregando(); 
    this.alunos = [];
    this.getNotasDisciplina.GetNotasDisciplina(iddisciplina).subscribe(notasDisciplinas => {
        if (notasDisciplinas) {
          setTimeout(() => {
            //console.log("notas:"); console.log(notasDisciplinas);
            this.alunos = notasDisciplinas;
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
