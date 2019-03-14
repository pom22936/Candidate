import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { from } from 'rxjs';
import { DataService } from '../data.service';

declare var swal: any;



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  model: any = {};

  constructor(private dataService : DataService , private route : Router) { }

  ngOnInit() {

    // console.log(this.data);
    let copyuser = this.dataService.getuser();
    this.model = copyuser.model;
    // console.log(this.model);

    this.model.gender = 'Male';
    this.model.title = 'empty';

  }

  checkgender(){

  }

  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model));
  }

  get getdatauserprofile(){
    return JSON.stringify(this.model);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  sw(){
        let temp:any = {};
        temp.model = this.model;
        this.dataService.setuser(temp);

        // this.route.navigateByUrl('/user-details');
  }




}
