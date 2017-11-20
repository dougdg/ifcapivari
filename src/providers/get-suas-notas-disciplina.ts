import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

export class ItemNota{
  itemname : String;
  finalgrade : String;  
  constructor(itemname : String, finalgrade : String) { 
    this.itemname = itemname;
    this.finalgrade = finalgrade; 
  }
}

@Injectable()
export class GetSuasNotasDisciplina {

  public urlbase = 'http://www.ifspcapivari.com.br/api/v1/notas/alunos/disciplinas';
  public apitoken = '&apitoken=e867ff0fefd62df7c9fb1bb2d90caf9b';
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'});
  private options = new RequestOptions({headers: this.headers});

  constructor(public http: Http) {}

  public GetSuasNotasDisciplina(iddisciplina) {    
    var usuario = JSON.parse(localStorage.getItem('currentUser'));
    if (usuario != null) {
      let token = "token=" + usuario.token;
      let idmateria = "&iddisciplina=" + iddisciplina;
      let body = token + idmateria + this.apitoken;
      let notas = [];
      
      return this.http.post(this.urlbase, body, this.options).map((response : Response) => {       
        if (response.json().status == 200) {
          let data = response.json().data;                    
          for(let i = 0; i < data.length; i++){ 
            let notadata = data[i];
            let nota = new ItemNota(notadata.itemname, notadata.finalgrade);
            notas.push(nota);
          }
          return notas;
        } else {
          return false;        
        }       

        })
        .catch((error : any) => Observable.throw(error.error || 'Erro pegando notas da disciplina')); // ERROR DE JSON - MODIFICADO
      };
  }

}
