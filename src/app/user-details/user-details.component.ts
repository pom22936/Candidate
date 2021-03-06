import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import {DataService} from '../data.service';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from '@angular/core/src/render3';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

declare var swal: any;

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  date: Date = new Date();
  allyear: any = [];
  allmonth: any = [];
  year: Number = 0;
  skill: string[] = [];
  project: any = {
    state : false,
    data : [],
    temp : []
  };
  modeldetail: any = {};
  certification: any = {
    state : false,
    data : [],
    temp : []
  };
  checksaveproject: Boolean;
  checksavecert: Boolean;
  checkcomplete: Boolean;
  constructor(private dataService: DataService,  private router: Router) { }

  ngOnInit() {
    this.allyear = Array(5).fill(new Date().getFullYear());
    this.allmonth = ["January","February","March","April","May","June","July","August","September","October","November","December"]

    let fromsession = this.dataService.getproject();

    this.modeldetail =  fromsession.details;
    this.certification = fromsession.certification;
    this.skill        = fromsession.skill;
    this.project = fromsession.project;

  }


  addskill(data = null){
    if(data)
    {
      let chack = this.skill.find(element => element == data);
      if(!chack){
        this.skill.push(data);
        this.modeldetail.skill = "";
      }
    }
  }

  checkAll(ch){
    if(this.project.state == true && this.certification.state == true && ch == false){
       this.checkcomplete = false;
    }else{
      this.checkcomplete = true;
    }
    return this.checkcomplete;
  }


  checksave(){
    const checkinput= [];
    //get true or false by input
    for (let index = 0; index < this.project.data.length; index++) {
      if(this.project.data[index].project == "" && this.project.data[index].role == "")
        checkinput[index] = true;
      else if(this.project.data[index].project == "" && this.project.data[index].role != "")
        checkinput[index] = true;
      else if(this.project.data[index].project != "" && this.project.data[index].role == "")
        checkinput[index] = true;
      else if(this.project.data[index].project != "" && this.project.data[index].role != "")
        checkinput[index] = false;
    }
    //check allvalue true or false
    let checktrue = checkinput.filter(x => x == true);
    if(checktrue .toString() == '')
      this.checksaveproject = false;
    else
      this.checksaveproject = true;
    return this.checksaveproject;
  }

  checkCertsave(){
    const checkinputcert= [];
    //get true or false by input
    for (let index = 0; index < this.certification.data.length; index++) {
      if(this.certification.data[index].certificate == '')
        checkinputcert[index] = true;
      else
        checkinputcert[index] = false;
    }
    //check allvalue true or false
    let checktruecert = checkinputcert.filter(x => x == true);
    if(checktruecert .toString() == '')
      this.checksavecert = false;
    else
      this.checksavecert = true;
    return this.checksavecert;
  }


  delskill(i){
    this.skill.splice(i, 1);
  }

  addproject = () =>{
    this.project.data.push({ project : "" ,role : "",month : "month", year : 2019});
    this.project.state = false;
  }

  addmoreproject = () =>{
    this.project.data.push({ project : "" ,role : "",month : "month", year : 2019});
    this.project.state = false;
  }

  addcertification = () =>{
    this.certification.data.push({ certificate : "",month:"month", year : 2019});
    this.certification.state = false;
  }

  savetemp(i){
    this.project.data[i].name = this.project.temp[i].name;
    this.project.data[i].year = this.project.temp[i].year;
  }

  delProject(i){
    this.project.data.splice(i , 1);
    this.project.state = false;
  }

  delCert(i){
    this.certification.data.splice(i , 1);
    this.certification.state = false;
  }

  public get datauserdetail(){
    return JSON.stringify(this.modeldetail);
  }

  sw(){
    swal.fire({type: 'warning',title: 'Are you sure your want to confirm this?', showCancelButton: true})
    .then(result => {
      if (result.value) {
        let temp: any = {};

        temp.details = this.modeldetail;
        temp.skill = this.skill;
        temp.project = this.project;
        temp.certification = this.certification;
        this.dataService.setproject(temp);

        this.router.navigateByUrl('/Complete');
      } else {
        // handle dismissals
        // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
      }
    });
  }
}
