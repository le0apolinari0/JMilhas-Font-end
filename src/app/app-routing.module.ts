import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './autenticacao/cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./autenticacao/autenticacao.module')
    .then(m => m.AutenticacaoModule)
  },
  {
    path: 'busca',
    loadChildren: () => import('./busca/busca.module')
    .then(m => m.BuscaModule),
  },
  {
    path: 'home',
    component: HomeComponent
  },
    
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
   path: "**",
   redirectTo: "/pagina-nao-encontrada",
   pathMatch: "full"
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
