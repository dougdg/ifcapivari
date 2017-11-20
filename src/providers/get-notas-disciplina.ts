import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

export class Aluno{
  firstname : string;
  notas : NotasDisciplina[];
  constructor(firstname : string, notas : NotasDisciplina[]) { 
    this.firstname = firstname; 
    this.notas = notas;
  }
}

export class NotasDisciplina{
  itemname : string;
  finalgrade : string;
  constructor(itemname : string, finalgrade : string) { 
    this.itemname = itemname; 
    this.finalgrade = finalgrade;
  }
}

@Injectable()
export class GetNotasDisciplina {

  public urlbase = 'http://www.ifspcapivari.com.br/api/v1/notas/disciplinas';
  public apitoken = '&apitoken=e867ff0fefd62df7c9fb1bb2d90caf9b';
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'});
  private options = new RequestOptions({headers: this.headers});

  constructor(public http: Http) {}

  public GetNotasDisciplina(iddisciplina) {    
    var usuario = JSON.parse(localStorage.getItem('currentUser'));
    if (usuario != null) {
      let token = "&token=" + usuario.token;
      let idmateria = "iddisciplina=" + iddisciplina;
      let body = idmateria + token + this.apitoken;
      let todas_alunos_e_notas_disciplina = [];
      let todas_notas_do_aluno = [];
      
      return this.http.post(this.urlbase, body, this.options).map((response : Response) => {
       
        if (response.json().status == 200) {
          let data = response.json().data;
                    
          for(let i = 0; i < data.length; i++){ // for de alunos // console.log("data[i][0].firstname: " + data[i][0].firstname);
            let namefirst = data[i][0].firstname;       
                       
            todas_notas_do_aluno = [];
            for(let j = 0; j < data.length; j++){ // for das notas desse aluno // console.log("data[i][1][j]: " + data[i][1][j]);
              let nota = data[i][1][j];     
             
              if(nota.itemname == null) {
                nota.itemname = " ";
              }

              let cada_nota = new NotasDisciplina(nota.itemname, nota.finalgrade);
              todas_notas_do_aluno.push(cada_nota);
            }
            let aluno_notas = new Aluno(namefirst, todas_notas_do_aluno);
            todas_alunos_e_notas_disciplina.push(aluno_notas);
          }
          return todas_alunos_e_notas_disciplina;
        } else {
          return false;        
        }       

        })
        .catch((error : any) => Observable.throw(error.error || 'Erro pegando notas da disciplina')); // ERROR DE JSON - MODIFICADO
      };
  }

}
