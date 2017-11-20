import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, AlertController, Nav } from 'ionic-angular';
import { App } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SobrePage } from '../pages/home/home';
import { FacebookPage } from '../pages/home/home';
import { FacetecaPage } from '../pages/home/home';

import { AcessoPage } from '../pages/moodle/acesso/acesso';

import { NoticiasPage } from '../pages/noticias/noticias';
import { LoginPage } from '../pages/mural/login/login';

@Component({ templateUrl: 'app.html' })
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, ionicon: string, color: string, component: any}>;
  lastBack = Date.now();

  constructor( public platform: Platform, public menu: MenuController, 
               public statusBar: StatusBar, public splashScreen: SplashScreen,
               public app : App, private ac : AlertController) {
    this.initializeApp();

    this.pages = [
      { title: 'Início', ionicon: 'home', color: 'secondary', component: HomePage },
      { title: 'Notícias', ionicon: 'paper', color: 'vermelho', component: NoticiasPage },
      { title: 'Moodle', ionicon: 'school', color: 'bright', component: AcessoPage },
      { title: 'Mural', ionicon: 'megaphone', color: 'royal', component: LoginPage },      
      { title: 'Campus', ionicon: 'logo-facebook', color: 'primary', component: FacebookPage },
      { title: 'Biblioteca', ionicon: 'logo-facebook', color: 'primary', component: FacetecaPage },   
      { title: 'Informações', ionicon: 'information-circle', color: 'ocean', component: SobrePage }   
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Impedir o voltar de fechar o app
      this.platform.registerBackButtonAction(() => {
        const overlay = this.app._appRoot._overlayPortal.getActive();
        const nav = this.app.getActiveNav();
      
        if(overlay && overlay.dismiss) {
          overlay.dismiss();
        } else if(nav.canGoBack()){
          nav.pop();
        } else if(Date.now() - this.lastBack < 500) {
          this.closeApp();          
        }
        this.lastBack = Date.now();
      });
      
    });
  }

  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }

  exitApp(){     
    this.platform.exitApp();
  }
  
  closeApp(){    
      let alerta = this.ac.create({
        title: 'Fechar aplicativo', 
        subTitle: 'Deseja mesmo sair?', 
        buttons: [
          { text:'Não', 
            handler: () => {
              alerta.dismiss();
            }
          },
          { text:'Sim', 
            handler: () => {
              alerta.dismiss();
              this.exitApp();
            }
          }
        ]  
      });
      alerta.present();    
  }
}
