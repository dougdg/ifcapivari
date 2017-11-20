import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';

export class Disciplinas {  
    id : string;
    fullname : string;
    shortname : string;
    roleid : string;
    profs : Prof[];
    constructor(id : string , fullname : string, shortname : string, roleid : string, profs : Prof[]) {
      this.id = id;
      this.fullname = fullname;
      this.shortname = shortname;
      this.roleid = roleid;    
      this.profs = profs;
    }
}

export class Prof {
    tutor : string;
    tutorid : string;
    constructor(tutor : string, tutorid : string){
      this.tutor = tutor;
      this.tutorid = tutorid;
    }
}

@Injectable()
export class GetDisciplinas {

  public urlbase = 'http://www.ifspcapivari.com.br/api/v1/disciplinas';
  public apitoken = '&apitoken=e867ff0fefd62df7c9fb1bb2d90caf9b';
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'});
  private options = new RequestOptions({headers: this.headers});

  constructor(public http: Http) {}

  public getDisciplinas() {
    var usuario = JSON.parse(localStorage.getItem('currentUser'));    
    if (usuario != null) {    
      let token = "token=" + usuario.token;  
      let body = token + this.apitoken;
      let disciplinas = [];
      let tutores = [];
     
      return this.http.post(this.urlbase, body, this.options).map((response : Response) => {        
        if (response.json().status == 200) {          
          let data = response.json().data;          
          //console.log("data[0][0].fullname: " + data[0][0].fullname); console.log("data[0].tutores[0].tutor: " + data[0].tutores[0].tutor);
          
          for(let i = 0; i < data.length; i++){//cada disciplina                    
            let disc = data[i][0];
            tutores = [];

            if (data[i].tutores.length == 0){
              let tutor = new Prof(" "," ");
              tutores.push(tutor);
            }
            else{
              for(let j = 0; j < data[i].tutores.length; j++){//cada tutor na disciplina
                let tutor = new Prof(data[i].tutores[j].tutor, data[i].tutores[j].id);
                //console.log("tutor " + tutor.tutor);
                tutores.push(tutor)
              }
            }
            let disciplina = new Disciplinas(disc.id, disc.fullname, disc.shortname, disc.roleid, tutores);
            disciplinas.push(disciplina);           
            //console.log("disciplina.profs: " + disciplina.profs[0].tutor);
          }
          return disciplinas;
        } else {
          return false;        
        }      
        })
        .catch((error : any) => Observable.throw(error.error || 'Erro pegando disciplinas')); // ERROR DE JSON - MODIFICADO
      };
  }

  public getDocenteDisciplinas(idtutor) {
    var usuario = JSON.parse(localStorage.getItem('currentUser'));    
    if (usuario != null) {    
      let token = "token=" + usuario.token;  
      let body = token + this.apitoken;
      let disciplinas = [];
      let tutores = [];

      return this.http.post(this.urlbase, body, this.options).map((response : Response) => {        
        if (response.json().status == 200) {          
          let data = response.json().data;          
          
          for(let i = 0; i < data.length; i++){//cada disciplina                    
            let disc = data[i][0];
            tutores = [];
            if (data[i].tutores.length == 0){ }
            else{
              for(let j = 0; j < data[i].tutores.length; j++){//cada tutor na disciplina
                if(idtutor == data[i].tutores[j].id){
                  let tutor = new Prof(data[i].tutores[j].tutor, data[i].tutores[j].id);
                  tutores.push(tutor);
                  let disciplina = new Disciplinas(disc.id, disc.fullname, disc.shortname, disc.roleid, tutores);
                  disciplinas.push(disciplina);
                }                
              }
            }
          }
          return disciplinas;
        } else {
          return false;        
        }      

        })
        .catch((error : any) => Observable.throw(error.error || 'Erro pegando disciplinas de docentes')); // ERROR DE JSON - MODIFICADO
      };
  }
}
