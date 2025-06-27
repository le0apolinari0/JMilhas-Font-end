
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { CadastroComponent } from "./cadastro/cadastro.component";
import { authGuard } from "./auth.guard";


const routes: Routes = [
  {
      path: 'login',
      component: LoginComponent
    },
     {
      path:'perfil',
      component: PerfilComponent,
      canActivate: [authGuard]
    },
    {
      path:'cadastro',
      component: CadastroComponent,

    }
]

@NgModule({

imports: [
  RouterModule.forChild(routes)
],

exports: [
  RouterModule
]

})

export class AutenticacaoRoutingModule{}
