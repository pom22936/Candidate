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
  constructor(private http : HttpClient, @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
  }

  sentmail(){
    this.sw_alert();
    this.json = {EMAIL : this.model.EMAIL};
    //https://itoaos-commnunity-api.com/register/candidate/sendemail/
    //http://jsonplaceholder.typicode.com/posts
    const req = this.http.post('http://jsonplaceholder.typicode.com/posts',JSON.stringify(this.json), httpOption)
      .subscribe(
        res => {
          console.log(JSON.stringify(this.json));
        },
        err => {
          console.log(err);
        }
      );
  }

  sw_alert(){
    let timerInterval;
    Swal.fire({
      imageUrl: '../../assets/img/email-noti.svg',
      imageAlt: 'A tall image',
      title: "Just one more stap...",

      // text: 'Please confirm your username and password in email to activate your account',
      // showCloseButton: true,
      // confirmButtonText:'Resend',
      // footer: 'Resend email again <strong></strong> seconds.',

      showConfirmButton: false,
      html: 'Please confirm your username and password in email to activate your account <br><br>'+
      '<button type="button" id="but-send" [disabled]="Swal.getTimerLeft != 0" (click)="sentmail()" class="btn btn-primary">' +
        'Resend' +
      '</button><br><br>'+
      'Resend email again <strong></strong> seconds.',
      timer: 20000,
      onBeforeOpen: () => {
        if(Swal.getTimerLeft() > 10000){
            timerInterval = setInterval(() => {
            Swal.getContent().querySelector('strong')
              .textContent = (Swal.getTimerLeft()/1000).toFixed(0);
              this.document.querySelector("#but-send").disabled = "true"
          }, 1000);
        }else{
          this.document.querySelector("#but-send").style.display = "none"
        }

      },
      onClose: () => {

        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.timer
      ) {
        console.log('I was closed by the timer');
      }

    });
  }

}
