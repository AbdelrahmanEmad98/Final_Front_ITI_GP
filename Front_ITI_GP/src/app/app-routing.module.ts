import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< Updated upstream
import { HomeComponent } from './components/home/home.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {path:"category/:id",component:SubCategoryComponent},
  {path:"cart/:id",component:CartComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"aboutUs",component:AboutUsComponent},
  {path:"**",component:ErrorComponent}


=======
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {path: "cart" , component:CartComponent}
>>>>>>> Stashed changes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
