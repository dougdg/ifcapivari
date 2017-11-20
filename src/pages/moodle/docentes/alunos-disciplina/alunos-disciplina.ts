import { Component } from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import {Aluno, GetAlunosDisciplina} from '../../../../providers/get-alunos-disciplina';

@Component({ selector: 'page-alunos-disciplina', templateUrl: 'alunos-disciplina.html' })
export class AlunosDisciplinaPage {

  carregando : Loading;
  alunos : Aluno[];

  constructor(private navCtrl : NavController, private alertCtrl : AlertController, 
              private getAlunosDisciplina : GetAlunosDisciplina, 
              private loadingCtrl : LoadingController, 
              public navParams : NavParams) {

    this.exibirAlunosDisciplina(navParams.data.iddisciplina);
  }

  ionViewDidLoad() { }

  exibirAlunosDisciplina(iddisciplina){
    this.exibeCarregando(); 
    this.alunos = [];
    this.getAlunosDisciplina.GetAlunosDisciplina(iddisciplina).subscribe(alunosDisciplina => {
        if (alunosDisciplina) {
          setTimeout(() => {
            //console.log("notas:"); console.log(alunosDisciplina);
            this.alunos = alunosDisciplina;
            this.carregando.dismiss();
          });
        } else {
            this.carregando.dismiss();
            this.exibeErro("Nao retornou nenhum aluno");
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
    let alerta = this.alertCtrl.create({title: 'Falha ao exibir alunos', subTitle: text, buttons: ['OK']});
    alerta.present();
  }

}
