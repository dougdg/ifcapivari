import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

export class AlunoNota{
  fullname : string;
  shortname : string;
  itemname : string;
  finalgrade : string;

  constructor(fullname : string, shortname : string, itemname : string, finalgrade : string){
    this.fullname = fullname;
    this.shortname = shortname;
    this.itemname = itemname;
    this.finalgrade = finalgrade;
  }
}

@Injectable()
export class GetNotas {

  public urlbase = 'http://www.ifspcapivari.com.br/api/v1/notas';
  public apitoken = '&apitoken=e867ff0fefd62df7c9fb1bb2d90caf9b';
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'});
  private options = new RequestOptions({headers: this.headers});

  constructor(public http: Http) {}

  public GetNotas() {
    
    var usuario = JSON.parse(localStorage.getItem('currentUser'));
    if (usuario != null) {
      
      let body = "token=" + usuario.token + this.apitoken;
      let notas = [];
      return this.http.post(this.urlbase, body, this.options).map((response : Response) => {
        if (response.json().status == 200) {
          let data = response.json().data;
          //console.log("getnotas running: " + response.json().data);
          for(let i = 0; i < data.length; i++){
            let item = data[i];
            let nota = new AlunoNota(item.fullname, item.shortname, item.itemname, item.finalgrade);
            notas.push(nota);
          }
          return notas;
        } else {
          return false;        
        }       

        })
        .catch((error : any) => Observable.throw(error.error || 'Erro pegando notas do aluno')); // ERROR DE JSON - MODIFICADO
      };
  }

}
