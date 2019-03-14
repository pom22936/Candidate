import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data : any = {};

  constructor( private http : HttpClient) {
    // this.http.get('http://localhost:7777/user').subscribe(res => {
    //     console.log(res);
    //   });
  }

  getuser(){
    let user = sessionStorage.getItem('user');
    if(user)
      return JSON.parse(user);
    else
      return {
        model : {}
      }
  }

  setuser(user){
    sessionStorage.setItem('user',JSON.stringify(user));
  }

  getproject(){
    let project = sessionStorage.getItem('project');
    if(project)
      return JSON.parse(project);
    else
      return {
        skill : [],
        project: {
          state : false,
          data : [],
          temp : []
        },
        details : {
          position : ''
        },
        certification: {
          state : false,
          data : [],
          temp : []
        }
      }
  }

  setproject(project){
    sessionStorage.setItem('project',JSON.stringify(project));
  }




}
