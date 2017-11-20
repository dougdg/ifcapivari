import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import {Disciplinas, GetDisciplinas} from '../../../providers/get-disciplinas';
import {SuasNotasDisciplinaPage} from './suas-notas-disciplina/suas-notas-disciplina';

@Component({ selector: 'page-suas-disciplinas', templateUrl: 'suas-disciplinas.html' })

export class SuasDisciplinasPage {
  carregando : Loading;
  disciplinas : Disciplinas[];
  idmateria : String;

  constructor(private navCtrl : NavController, private alertCtrl : AlertController, private getDisciplinas : GetDisciplinas,
              private loadingCtrl : LoadingController, public navParams : NavParams) {
    this.exibirDisciplinas();
  }

  exibirDisciplinas(){
    this.exibeCarregando(); 
    this.disciplinas = [];
    this.getDisciplinas.getDisciplinas().subscribe(disciplinasRecebidas => {
        if (disciplinasRecebidas) {
          setTimeout(() => {
            //console.log("disciplinasRecebidas:"); console.log(disciplinasRecebidas);
            this.disciplinas = disciplinasRecebidas;
            this.carregando.dismiss();
          });
        } else {
            this.carregando.dismiss();
            this.exibeErro("Nao retornou nenhuma disciplina");
        }
      }, 
       error => { this.exibeErro(error); }
      );  

  }

  public verNotas(id){
    this.navCtrl.push(SuasNotasDisciplinaPage, { iddisciplina : id });
  }

  exibeCarregando() {
    this.carregando = this.loadingCtrl.create({content: 'Por favor aguarde...'});
    this.carregando.present();
  }

  exibeErro(text) { 
    setTimeout(() => { this.carregando.dismiss(); });
    let alerta = this.alertCtrl.create({title: 'Falha ao exibir disciplinas', subTitle: text, buttons: ['OK']});
    alerta.present();
  }

}
