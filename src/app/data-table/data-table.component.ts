import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  public restaurants: any;
  public isloaded: boolean = false;
  p: number = 1;
  currentAddress: any = {};
  isModelOpen: boolean = false;

  constructor(private appService: AppService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.appService.getData().subscribe(
      (response: any) => {
        this.restaurants = response.data;
        this.isloaded = true;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.isloaded = false;
      }
    )
  }

  openModel(data: any, template: any): void {
    this.isModelOpen = true;
    this.currentAddress = JSON.parse(data[0]);
    this.modalService.open(template).result.then((result) => {
      console.log('open')
    }, (reason) => {
      console.log(reason)
      this.isModelOpen = false;
      this.currentAddress = {};
    });
  }

  ngOnDestroy() {
    this.isloaded = false;
    this.isModelOpen = false;
    this.currentAddress = {};
  }

}
