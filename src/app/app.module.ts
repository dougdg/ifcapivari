import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import {BrowserModule} from "@angular/platform-browser";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook'
import { GooglePlus } from '@ionic-native/google-plus';
import { Market } from '@ionic-native/market';

import { HomePage, SobrePage, FacebookPage, FacetecaPage, ArtigoHomePage } from '../pages/home/home';
import { NoticiasPage, ArtigoPage } from '../pages/noticias/noticias';
import { LoginPage } from '../pages/mural/login/login';
import { MuralPage, FcaronaPage, FmoradiaPage, OfeCaronaPage, PedCaronaPage, OfeMoradiaPage, PedMoradiaPage } from '../pages/mural/mural';
import { AcessoPage } from '../pages/moodle/acesso/acesso';
import { MoodlePage, UsuarioPage } from '../pages/moodle/moodle';
import { SuasDisciplinasPage } from '../pages/moodle/suas-disciplinas/suas-disciplinas';
import { SuasNotasPage } from '../pages/moodle/suas-notas/suas-notas';
import { SuasNotasDisciplinaPage } from '../pages/moodle/suas-disciplinas/suas-notas-disciplina/suas-notas-disciplina';
import { NotasDisciplinaPage } from '../pages/moodle/docentes/notas-disciplina/notas-disciplina';
import { DocentesPage } from '../pages/moodle/docentes/docentes';
import { AlunosDisciplinaPage } from '../pages/moodle/docentes/alunos-disciplina/alunos-disciplina';

import { PRAUT } from '../providers/praut';
import { GetUsuario } from '../providers/get-usuario';
import { GetNoticias } from '../providers/get-noticias';
import { GetDisciplinas } from '../providers/get-disciplinas';
import { GetNotas } from '../providers/get-notas';
import { GetNotasDisciplina } from '../providers/get-notas-disciplina';
import { GetSuasNotasDisciplina } from '../providers/get-suas-notas-disciplina';
import { GetAlunosDisciplina } from '../providers/get-alunos-disciplina';

import { PRAF } from '../providers/praf';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { TextMaskModule } from 'angular2-text-mask';

export const FIREBASE_CONFIG = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};


@NgModule({
  declarations: [
    MyApp,
    AcessoPage,
    SobrePage,
    HomePage,
    NoticiasPage,
    ArtigoPage,
    ArtigoHomePage,
    MuralPage,
    LoginPage,
    FcaronaPage,
    FmoradiaPage,
    OfeCaronaPage,
    PedCaronaPage,
    OfeMoradiaPage,
    PedMoradiaPage,
    MoodlePage,
    UsuarioPage,
    SuasDisciplinasPage,
    SuasNotasPage,
    SuasNotasDisciplinaPage,
    DocentesPage,
    AlunosDisciplinaPage,
    NotasDisciplinaPage,
    FacebookPage,
    FacetecaPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    TextMaskModule    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AcessoPage,
    SobrePage,
    HomePage,
    NoticiasPage,
    ArtigoPage,
    ArtigoHomePage,
    MuralPage,
    LoginPage,
    FcaronaPage,
    FmoradiaPage,
    OfeCaronaPage,
    PedCaronaPage,
    OfeMoradiaPage,
    PedMoradiaPage,
    MoodlePage,
    UsuarioPage,
    SuasDisciplinasPage,
    SuasNotasPage,
    SuasNotasDisciplinaPage,
    DocentesPage,
    AlunosDisciplinaPage,
    NotasDisciplinaPage,
    NoticiasPage,
    FacebookPage,
    FacetecaPage
  ],
  providers: [    
    StatusBar,
    SplashScreen,
    PRAUT,
    GetUsuario,
    GetNoticias,
    GetDisciplinas,
    GetNotas,
    GetNotasDisciplina,
    GetAlunosDisciplina,
    GetSuasNotasDisciplina,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PRAF,
    Facebook,
    GooglePlus,
    Market
  ]
})
export class AppModule {}
