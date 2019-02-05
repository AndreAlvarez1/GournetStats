import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VentasdiariasPage } from './ventasdiarias.page';

const routes: Routes = [
  {
    path: '',
    component: VentasdiariasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VentasdiariasPage]
})
export class VentasdiariasPageModule {}
