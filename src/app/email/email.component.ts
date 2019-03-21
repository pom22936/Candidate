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
    this.json = {'"EMAIL"' : this.model.EMAIL}

    const req = this.http.post('https://itoaos-commnunity-api.com/register/candidate/sendemail/', {
      data: this.json
    }, httpOption)
      .subscribe(
        res => {
          Swal.fire({
            type: 'success',
            title: JSON.stringify(res),
            showConfirmButton: false,
            timer: 5000
          });
        },
        err => {
          console.log(err);
        }
      );
  }

}
