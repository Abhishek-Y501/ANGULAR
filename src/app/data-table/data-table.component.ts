import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { error } from 'protractor';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  public citiesData:any;
  public isloaded: boolean = false;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getData().subscribe(
      (response: any) => {
        this.citiesData = response.meta.view;
        console.log(this.citiesData)
        this.isloaded = true;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.isloaded = false;
      }
    )
  }

  ngOnDestroy() {
    this.isloaded = false;
  }

}
