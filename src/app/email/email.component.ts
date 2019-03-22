import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  constructor(private http : HttpClient) { }

  ngOnInit() {
  }

  sentmail(){
    this.json = {EMAIL : this.model.EMAIL};

    const req = this.http.post('http://jsonplaceholder.typicode.com/posts',JSON.stringify(this.json), httpOption)
      .subscribe(
        res => {
          let timerInterval;
          Swal.fire({
            imageUrl: '../../assets/img/email-noti.svg',
            imageAlt: 'A tall image',
            title: "Just one more stap...",
            // confirmButtonText:  'Resend',
            showConfirmButton: false,
            html: 'Please confirm your username and password in email to activate your account <br><br>'+
            '<button id="toggle" *ngIF="timerInterval = 0" class="btn btn-primary">' +
              'Resend' +
            '</button><br><br>'+
            'Resend email again <strong></strong> seconds.',
            timer: 1000 * 60,
            onBeforeOpen: () => {
              timerInterval = setInterval(() => {
                Swal.getContent().querySelector('strong')
                  .textContent = Swal.getTimerLeft()
              }, 1000)
            },
            onClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            if (
              // Read more about handling dismissals
              result.dismiss === Swal.DismissReason.timer
            ) {
              console.log('I was closed by the timer')
            }

          })
        },
        err => {
          console.log(err);
        }
      );
  }

}
