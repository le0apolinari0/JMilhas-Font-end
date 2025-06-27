import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PessoaUsuaria } from 'src/app/core/types/type';
import { TokenService } from '../services/token.service';
import { CadastroService } from '../services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  titulo = "Olá !";
  textoBotao = "ATUALIZAR";
  perfilComponent = true;

  token: string | null = null;
  nome: string = '';
  cadastro! : PessoaUsuaria;
  formulario!: FormGroup <any> | null;

  constructor(
    private tokenService : TokenService,
    private cadastroService: CadastroService,
    private formularioService: FormularioService,
    private router: Router,
    private userService: UserService

  ) { }
 ngOnInit(): void {
    this.token = this.tokenService.recuperarToken();
    this.cadastroService.buscarCadastro().subscribe( cadastro => {
     this.cadastro = cadastro;
      this.nome = cadastro.nome;
      this.carregarFormulario();
   } )
}

carregarFormulario() {
  this.formulario = this.formularioService.getCadastro() ;
  this.formulario?.patchValue({
    nome: this.cadastro.nome,
      nascimento: this.cadastro.nascimento,
      cpf: this.cadastro.cpf,
      cidade: this.cadastro.cidade,
      email: this.cadastro.email,
      senha: this.cadastro.senha,
      genero: this.cadastro.genero,
      telefone: this.cadastro.telefone,
      estado: this.cadastro.estado,

   })
}

atualizar() {
   const dadosAtualizados = {
    nome: this.formulario?.value.nome,
      nascimento: this.formulario?.value.nascimento,
      cpf: this.formulario?.value.cpf,
      telefone: this.formulario?.value.telefone,
      email: this.formulario?.value.email,
      senha: this.formulario?.value.senha,
      genero: this.formulario?.value.genero,
      cidade: this.formulario?.value.cidade,
      estado: this.formulario?.value.estado
   }
   this.cadastroService.atualizarCadastro(dadosAtualizados).subscribe({
      next: () => {
         alert("Cadastro atualizado com sucesso!");
          this.router.navigate(['/']);
      },
      error: (erro) => {
        console.error("Erro ao atualizar cadastro:", erro);
      }
    });

  }

  deslogar() {
  this.userService.logout();
  this.router.navigate(['auth/login']);
  // Limpar tokens do localStorage/sessionStorage/redirecionando para tela de login
  localStorage.removeItem('token');
    console.log("Deslogando...");
  }

}
