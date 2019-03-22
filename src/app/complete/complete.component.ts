import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ4bWl3VW4zVHJUSDMyNElIb3UzTlkzcHBUbmRsUjFiMSJ9.RyFjP38_jvdWGxGh4C3UL9lAjoeX-dBF_QtxThPp1e0'
  })
};

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {

  data : any = {};
  json:any = {};
  datahttp:any;
  result:any;
  project : any;
  certificate:any;

  constructor(private dataService :DataService, private http : HttpClient) { }

  ngOnInit() {
    this.data.user = this.dataService.getuser();
    this.data.detail = this.dataService.getproject();

    this.json =
    {
      email : this.data.user.model.email,
      first_name: this.data.user.model.name,
      last_name: this.data.user.model.sername,
      gender: this.data.user.model.gender,
      phone: this.data.user.model.phone,
      address: this.data.user.model.address,
      position: this.data.detail.details.position,
      skill: String(this.data.detail.skill),
      project: this.data.detail.project.data ,
      certificate: this.data.detail.certification.data
    };

    // console.log(JSON.stringify(this.json));
    // http://localhost:7777/user/newuser
    // https://itoaos-commnunity-api.com/register/candidate/createinfo/
    // http://jsonplaceholder.typicode.com/posts
    console.log(JSON.stringify(this.json));
    const req = this.http.post('https://itoaos-commnunity-api.com/register/candidate/createinfo/',JSON.stringify(this.json), httpOption)
      .subscribe(
        res => {
          console.log(this.json);
        },
        err => {
          console.log(err);
        }
      );

      //http://localhost:7777/user

      // this.http.get('http://localhost:7777/user').subscribe(res => {
      //   this.datahttp = res;
      //   console.log(this.datahttp);
      // });

  }




}
