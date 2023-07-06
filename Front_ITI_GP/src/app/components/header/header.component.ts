import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/Customer/customer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navBarIsLoggedIn = false;
  constructor(private authenticationService: CustomerService) {}
  ngOnInit(): void {
    this.authenticationService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.navBarIsLoggedIn = isLoggedIn;
    });
  }

}
