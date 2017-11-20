import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';

export class Usr {  
  uname : string;
  pwd : string;
  tok : string;

  constructor(uname : string, pwd : string, tok : string) {
    this.uname = uname;
    this.pwd = pwd;
    this.tok = tok;
  }
}

@Injectable()
export class PRAUT {

  cUsr : Usr;

  public urlapi = 'http://www.ifspcapivari.com.br/api/v1/autenticar/usuario';
  public apitoken = '&apitoken=e867ff0fefd62df7c9fb1bb2d90caf9b';
  private h = new Headers({'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'});
  private o = new RequestOptions({headers: this.h});

  constructor(private http : Http) {}

  public autenticarUsuario(usr) : Observable < boolean > {

    let u = "usuario=" + usr.prontuario;
    let s = "&senha=" + usr.senha;
    let msg = u + s + this.apitoken;

    return this.http.post(this.urlapi, msg, this.o).map((response : Response) => {
                
        if (response.json().status == 200) {
          let token = response.json().data[0].token;

          this.cUsr = new Usr(usr.prontuario, usr.senha, token);
          localStorage.setItem('currentUser', JSON.stringify({username: usr.prontuario, 
                                                              password: usr.senha, token: token}));

          return true;
        } else { 
          return false; 
        }
      })
      .catch((error : any) => Observable.throw(error.json().error || 'Erro autenticando'));
  };
}
