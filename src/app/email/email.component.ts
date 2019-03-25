import { Component, OnInit, Inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as $ from 'jquery';
import { DOCUMENT } from '@angular/common';
import { timer } from 'rxjs';

declare var Swal: any;

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ4bWl3VW4zVHJUSDMyNElIb3UzTlkzcHBUbmRsUjFiMSJ9.RyFjP38_jvdWGxGh4C3UL9lAjoeX-dBF_QtxThPp1e0'
  })
};

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  model:any = {};
  json:any = {};
  time:any;
  distance:any;
  constructor(private http : HttpClient, @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
  }

  sentmail(){
    this.json = {EMAIL : this.model.EMAIL};
    //https://itoaos-commnunity-api.com/register/candidate/sendemail/
    //http://jsonplaceholder.typicode.com/posts
    const req = this.http.post('https://itoaos-commnunity-api.com/register/candidate/sendemail/',JSON.stringify(this.json), httpOption)
      .subscribe(
        res => {
          console.log(JSON.stringify(this.json));
        },
        err => {
          console.log(err);
        }
      );
      var timelimit = 360000;
      var cout =  0;
      this.time = setInterval(() => {
          cout += 1000;
          this.distance = timelimit - cout;
          var minutes = Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
          document.getElementById("demo").innerHTML =  minutes + ":" + seconds ;
          if (this.distance < 0) {
            clearInterval(this.time);
            document.getElementById("demo").innerHTML = "Time Up!";
          }
      }, 1000);
  }

}
