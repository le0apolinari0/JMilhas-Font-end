import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MaterialModule } from "src/app/core/material/material.module";
import { DepoimentosComponent } from "./depoimentos/depoimentos.component";
import { HomeComponent } from "./home.component";
import { PromocoesComponent } from "./promocoes/promocoes.component";
import { SharedModule } from "../shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";


@NgModule({
    declarations: [
        PromocoesComponent,
        DepoimentosComponent,
        HomeComponent
    ],
     imports: [
        CommonModule,
        MaterialModule,
        SharedModule,
        HomeRoutingModule
    ],
    exports: [
      PromocoesComponent,
      DepoimentosComponent,
      HomeComponent
    ]
})
export class HomeModule {
}
