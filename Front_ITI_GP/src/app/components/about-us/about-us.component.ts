import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/Customer/customer.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  dataArray: any;
  constructor(private _ser: CustomerService) {}

  ngOnInit(): void {
    //this._ser.getTestData().subscribe((value) => (this.dataArray = value));
    this._ser.GetCustomerInfoById("fc5a4ec0-2542-4732-ac72-c44fcab94e53").subscribe((value) => (

      //console.log(value)
      this.dataArray = value
      ));


  }
}
