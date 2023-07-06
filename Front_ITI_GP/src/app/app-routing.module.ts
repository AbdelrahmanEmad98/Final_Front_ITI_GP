import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ErrorComponent } from './components/error/error.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { authenticationGuard } from './guards/authentication.guard';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'category/:id', component: SubCategoryComponent },
  { path: 'cart/:id', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'aboutUs', component: AboutUsComponent },
  { path: 'cart', component: CartComponent },
  { path:'checkout',component: CheckOutComponent},

// =====================================

{
  path: 'profile',
  canActivate: [authenticationGuard],
  component: ProfileComponent,
},
  {
    path: 'authentication',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
// =====================================

  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
