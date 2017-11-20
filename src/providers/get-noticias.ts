import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/Rx';

export class Noticia{
  id : string;
  autor : string;
  post_date : string;
  post_content : string;
  post_title : string;

  constructor(id : string, autor : string, post_date : string, post_content : string, post_title : string){
    this.id = id;
    this.autor = autor;
    this.post_date = post_date;
    this.post_content = post_content;
    this.post_title = post_title;
  }
}

@Injectable()
export class GetNoticias {

  //public urlbase = 'http://www.ifspcapivari.com.br/api/v1/noticias/0/20'; // 20 ultimas noticias
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'});
  private options = new RequestOptions({headers: this.headers});

  constructor(public http : Http) {}

  public getNoticias(quantidade) {
    
    let urln = "http://www.ifspcapivari.com.br/api/v1/noticias/0/" + quantidade;
    let noticias = [];
    return this.http.get(urln, this.options).map((response : Response) => {
       if (response.json().status == 200) {
        let data = response.json().data;
        for(let i = 0; i < data.length; i++){
          let item = data[i];
          let noticia = new Noticia(item.id, item.autor, item.post_date, item.post_content, item.post_title);
          noticias.push(noticia);
        }
        return noticias;
      } else {
        console.log("Erro: status nao eh 200!");
        return false;        
      }       

      })
      .catch((error : any) => Observable.throw(error.error || 'Erro pegando noticias')); // ERROR DE JSON - MODIFICADO
  };



}
