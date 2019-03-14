import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {

  data : any = {};
  datahttp:any;

  constructor(private dataService :DataService, private http : HttpClient) { }

  ngOnInit() {
    // console.log(this.dataService.getuser());
    // console.log(this.dataService.getproject());
    this.data.user = this.dataService.getuser();
    this.data.detail = this.dataService.getproject();
    console.log(this.data);

    //http://localhost:7777/user/newuser
    // const req = this.http.post('http://localhost:7777/user/newuser', {
    //   data: JSON.stringify(this.data)
    // }, httpOption)
    //   .subscribe(
    //     res => {
    //       console.log(res);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );

      //http://localhost:7777/user
      // this.http.get('http://localhost:7777/user').subscribe(res => {
      //   this.datahttp = res;
      //   console.log(this.datahttp);
      // });

  }




}
