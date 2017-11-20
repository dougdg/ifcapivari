import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';

export class Aluno{
  id : String;
  firstname : String;
  lastname : String;
  
  constructor(id : String, firstname : String, lastname : String) { 
    this.id = id;
    this.firstname = firstname; 
    this.lastname = lastname;
  }
}

@Injectable()
export class GetAlunosDisciplina {

  public urlbase = 'http://www.ifspcapivari.com.br/api/v1/alunos/disciplinas';
  public apitoken = '&apitoken=e867ff0fefd62df7c9fb1bb2d90caf9b';
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'});
  private options = new RequestOptions({headers: this.headers});

  constructor(public http: Http) {}

  public GetAlunosDisciplina(iddisciplina) {    
    var usuario = JSON.parse(localStorage.getItem('currentUser'));
    if (usuario != null) {
      let token = "&token=" + usuario.token;
      let idmateria = "iddisciplina=" + iddisciplina;
      let body = idmateria + token + this.apitoken;
      let alunos = [];
      
      return this.http.post(this.urlbase, body, this.options).map((response : Response) => {       
        if (response.json().status == 200) {
          let data = response.json().data;                    
          for(let i = 0; i < data.length; i++){ 
            let alunodata = data[i];
            let aluno = new Aluno(alunodata.id, alunodata.firstname, alunodata.lastname);
            alunos.push(aluno);
          }
          return alunos;
        } else {
          return false;        
        }       

        })
        .catch((error : any) => Observable.throw(error.error || 'Erro pegando alunos da disciplina')); // ERROR DE JSON - MODIFICADO
      };
  }

}
