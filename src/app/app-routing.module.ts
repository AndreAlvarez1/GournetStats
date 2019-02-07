import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'ventasdiarias', loadChildren: './informes/ventasdiarias/ventasdiarias.module#VentasdiariasPageModule'
  },
  {
    path: 'soporte', loadChildren: './pages/soporte/soporte.module#SoportePageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
