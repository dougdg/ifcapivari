import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

export class UsuarioDados {  
    id : string;
    username : string;
    firstname : string;
    lastname : string;
    email : string;
    city : string;
    image : string;

  constructor(id : string , username : string, firstname : string, lastname : string, 
              email : string, city : string, image : string) {
    this.id = id;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.city = city;
    this.image = image;
  }
}

@Injectable()
export class GetUsuario {

  userDados : UsuarioDados;

  public urld = 'http://www.ifspcapivari.com.br/api/v1/dados';
  public apitoken = '&apitoken=e867ff0fefd62df7c9fb1bb2d90caf9b';
  private h = new Headers({'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'});
  private o = new RequestOptions({headers: this.h});

  constructor(public http: Http) {}

  public validaToken(token) : Observable < boolean > {

    let t = "token=" + token;
    let tt = t + this.apitoken;

    return this.http.post(this.urld, tt, this.o).map((res : Response) => {
        let status = res.json().status;
        //console.log(status);
        
        if (status == 200) {
          //console.log(response.json());
          //console.log("User: " + response.json().data.firstname);
          return true;
        } else {
          return false;
        }
      })
      .catch((error : any) => Observable.throw(error.error || 'Erro achando usuario')); // ERROR DE JSON - MODIFICADO
  };

  public getUsuario(token) : Observable < UsuarioDados > {

    let utok = "token=" + token;
    let corpo = utok + this.apitoken;

    return this.http.post(this.urld, corpo, this.o).map((response : Response) => {
       if (response.json().status == 200) {
          let data = response.json().data;
          //console.log("User: " + data.firstname);
          var nome = data.firstname + " " + data.lastname;
          var username = data.username;
          var foto = data.image;
          var email = data.email;
          
          localStorage.setItem('moodleUser', JSON.stringify({nome: nome, username: username, 
                                                             email: email, foto: foto}));
          this.userDados = new UsuarioDados(data.id, data.username, data.firstname, 
                                  data.lastname, data.email, data.city, data.image);
          return this.userDados;
        } else {
          return false;
        }
      })
      .catch((error : any) => 
        Observable.throw(error.error || 'Erro pegando usuario')); 
  }
}
