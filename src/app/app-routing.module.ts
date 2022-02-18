import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './modules/shared/layout/layout.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "fruits",
        loadChildren: () =>
        import("./modules/fruit/fruit.module").then((mod) => mod.FruitModule)
      },
      {
        path: "",
        redirectTo: "/fruits",
        pathMatch: "full",
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
