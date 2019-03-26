import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import {DataService} from '../data.service';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from '@angular/core/src/render3';

declare var swal: any;

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  date:Date = new Date();
  allyear : any = [];
  year:Number = 0;
  skill:string[] = [];
  project:any = {
    state : false,
    data : [],
    temp : []
  }
  pjsave:boolean = false;
  modeldetail : any = {};
  certification:any = {
    state : false,
    data : [],
    temp : []
  }
  constructor(private dataService : DataService,  private router : Router) { }

  ngOnInit() {

    this.allyear = Array(5).fill(new Date().getFullYear());

    let fromsession = this.dataService.getproject();

    this.modeldetail =  fromsession.details;
    this.certification = fromsession.certification;
    this.skill        = fromsession.skill;
    this.project = fromsession.project;

    // console.log(this.project);
  }

  addskill(data = null){
    if(data){
      let chack = this.skill.find(element => element==data);
      if(!chack){
        this.skill.push(data);
        this.modeldetail.skill = "";
      }
    }

  }


  delskill(i){
    this.skill.splice(i, 1);
  }

  addproject = () =>{
    this.project.data.push({ project : "" , year : 2019});
  }

  addcertification = () =>{
    this.certification.data.push({ certificate : "" , year : 2019});
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
        let temp:any = {};

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
