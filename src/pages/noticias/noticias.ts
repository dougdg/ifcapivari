import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, Loading} from 'ionic-angular';
import {Noticia, GetNoticias} from '../../providers/get-noticias';

@Component({ templateUrl: 'artigo.html',})
export class ArtigoPage {
  item;

  constructor(params: NavParams) {
     this.item = params.data.item;
  }
}

@Component({selector: 'page-noticias', templateUrl: 'noticias.html'})
export class NoticiasPage {
  
  carregando : Loading;
  noticias : Noticia[];

  constructor(private navCtrl : NavController, private alertCtrl : AlertController, private getNoticias : GetNoticias,
              private loadingCtrl : LoadingController, public navParams : NavParams) {
    this.exibirNoticias();
  }

  public exibirNoticias(){
    this.exibeCarregando(); 
    this.noticias = [];
    this.getNoticias.getNoticias("25").subscribe(noticiasRecebidas => {
        if (noticiasRecebidas) {
          setTimeout(() => {
            //console.log("Noticias:"); console.log(noticiasRecebidas);
            this.noticias = noticiasRecebidas;
            this.carregando.dismiss();
          });
        } else {
            this.carregando.dismiss();
            this.exibeErro("Nao retornou nenhuma noticia");
        }
      }, 
       error => { this.exibeErro(error); }
      );  
  }

  abrirArtigo(item){
    this.navCtrl.push(ArtigoPage, { item: item });
  }

  exibeCarregando() {
    this.carregando = this.loadingCtrl.create({content: 'Por favor aguarde...'});
    this.carregando.present();
  }

  exibeErro(text) { 
    setTimeout(() => { this.carregando.dismiss(); });
    let alerta = this.alertCtrl.create({title: 'Falha ao exibir noticias', subTitle: text, buttons: ['OK']});
    alerta.present();
  }


}
