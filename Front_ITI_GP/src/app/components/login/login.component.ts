import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/Customer/customer.service';
import { LoginDto } from 'src/app/Models/LoginDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  showPassword = false;

  message: any;
  displayAlert = 'd-none';
  FlagError = false;

  constructor(protected _ser: CustomerService, private router: Router) {}

  loginFrm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  keyPressMinLength(event: any, len: number) {
    let inp = event.target.value;
    inp.length < len ? true : event.preventDefault();
  }

  openDialog(mess: string, errFlag: boolean) {
    this.message = mess;
    this.FlagError = errFlag;
    this.displayAlert = 'd-block';
  }

  closePopup() {
    this.displayAlert = 'd-none';
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    if (this.loginFrm.invalid) {
      // Display error messages
      Object.keys(this.loginFrm.controls).forEach((field) => {
        const control = this.loginFrm.get(field);
        if (control?.invalid) {
          control.markAsTouched({ onlySelf: true });
          console.log(control);
        }
      });
      console.log('I am Invalid');
    } else if (this.loginFrm.valid) {


      var credentials = new LoginDto();
      credentials.email = this.loginFrm.controls.email.value ?? '';
      credentials.password = this.loginFrm.controls.password.value ?? '';

      this._ser.login(credentials).subscribe((tokenDto) => {
        console.log(tokenDto);
        this.router.navigateByUrl('/');
      });



      // var credentials = new LoginDto();
      // credentials.email = this.loginFrm.controls.email.value!;
      // credentials.password = this.loginFrm.controls.password.value!;
      // this._ser
      //   .LoginCustomer(credentials)
      //   .subscribe({
      //     next: (token) => {
      //       console.log(token);
      //       this.router.navigateByUrl('/home');
      //     },
      //     error: () => {
      //       this.openDialog('Invalid Credentials !', true);
      //     },
      //   });




    }
  }
}
