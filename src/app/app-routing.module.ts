import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoCompradorComponent } from './pages/info-comprador/info-comprador.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "meus-numeros", component: InfoCompradorComponent },
  {path: "login", component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
