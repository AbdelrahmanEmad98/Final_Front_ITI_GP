import { Component, OnInit, inject } from '@angular/core';
import { CustomerService } from 'src/app/services/Customer/customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private customerService: CustomerService) {}
  // private checkLogin = inject(CustomerService);

  public isLoggedIn: boolean = false;

  public customer: any;

  ngOnInit(): void {
    this.customerService.isLoggedIn$.subscribe(
      (logIn) => {
        this.isLoggedIn = logIn;
        // this.GetData();
      },
      (error) => {}
    );
    this.customerService.GetCustomer().subscribe(
      (data) => {
        this.customer = data;
      },
      (error) => {}
    );
  }

  logOut() {
    this.customerService.logout();

    this.isLoggedIn = false;
  }

  //   GetData() {
  //     if (this.isLoggedIn) {
  //       this.customerService.GetCustomer().subscribe(
  //         (data) => {
  //           this.customer = data;
  //         },
  //         (error) => {}
  //       );
  //     }
  //   }
}
