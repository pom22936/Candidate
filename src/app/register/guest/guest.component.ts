import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  constructor(private dataService :DataService, private http : HttpClient) { }

  data : any = {};

  ngOnInit() {
    this.data.user = this.dataService.getuser();
    this.data.detail = this.dataService.getproject();
  }

}
