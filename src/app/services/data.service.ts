import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class DataService {

   url: string = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  listaUsuarios(){
    return this.http.get(this.url);
  }

  crearUsuario(a: any){
    return this.http.post(this.url+'usuario', a);
  }

  loginUsuario(a: any){
    return this.http.get(this.url+'usuario/'+a);
  }
  //publicacion

  /* getPublicacion(){
    return this.http.get(this.url+'publicacion');
  }

  postPublicacion(a: any){
    return this.http.post(this.url+'publicacion', a);
  }

  putPublicacion(a:any, b:any){
    return this.http.get(this.url+'usuario/'+a,b);
  }

  deletePublicacion(a: any){
    return this.http.delete(this.url+'publicacion/'+a);
  } */
}
