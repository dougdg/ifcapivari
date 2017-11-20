import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import {Disciplinas, GetDisciplinas} from '../../../providers/get-disciplinas';
import {AlunosDisciplinaPage} from './alunos-disciplina/alunos-disciplina';
import {NotasDisciplinaPage} from './notas-disciplina/notas-disciplina';
import {HomePage} from '../../home/home';

@Component({selector: 'page-docentes', templateUrl: 'docentes.html'})

export class DocentesPage {
  carregando : Loading;
  idmateria : String;
  disciplinas : Disciplinas[];
  consulta = { disciplina: '', tipo: '' };
  id;
  username;
  firstname;
  lastname;
  email;
  city;
  image;

    constructor(private navCtrl : NavController, private alertCtrl : AlertController, private getDisciplinas : GetDisciplinas,
              private loadingCtrl : LoadingController, public navParams : NavParams) {
      this.id = navParams.data.dadosUsuario.id;
      this.username = navParams.data.dadosUsuario.username;
      this.firstname = navParams.data.dadosUsuario.firstname;
      this.lastname = navParams.data.dadosUsuario.lastname;
      this.email = navParams.data.dadosUsuario.email;
      this.city = navParams.data.dadosUsuario.city;
      this.image = navParams.data.dadosUsuario.image;
      this.exibirDisciplinas();
    }
    
    exibirDisciplinas(){
    this.exibeCarregando(); 
    this.disciplinas = [];
    this.getDisciplinas.getDocenteDisciplinas(this.id).subscribe(disciplinasRecebidas => {
        if (disciplinasRecebidas) {
          setTimeout(() => {
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

  public AlunosDisciplina(){
    if(this.idmateria != null){
      this.navCtrl.push(AlunosDisciplinaPage, { iddisciplina: this.idmateria });
    }
    else{
      this.exibeErro1("Por favor, escolha uma disciplina primeiro.");
    }    
  }

  public NotasDisciplina(){
    if(this.idmateria != null){
      this.navCtrl.push(NotasDisciplinaPage, { iddisciplina: this.idmateria });
    }
    else{
      this.exibeErro1("Por favor, escolha uma disciplina primeiro.");
    }    
  }

  deslogar(){
    localStorage.removeItem('currentUser');
    this.navCtrl.setRoot(HomePage);
  }

  voltarInicio(){
    this.navCtrl.setRoot(HomePage);
  }
  
  exibeCarregando() {
    this.carregando = this.loadingCtrl.create({content: 'Por favor aguarde...'});
    this.carregando.present();
  }

  exibeErro(text) { 
    setTimeout(() => { this.carregando.dismiss(); });
    let alerta = this.alertCtrl.create({title: 'Falha ao exibir disciplinas', subTitle: text, buttons: ['OK, entendi']});
    alerta.present();
  }

  exibeErro1(text) { 
    setTimeout(() => { this.carregando.dismiss(); });
    let alerta = this.alertCtrl.create({title: 'Escolha uma Disciplina', subTitle: text, buttons: ['OK, entendi']});
    alerta.present();
  }


}
