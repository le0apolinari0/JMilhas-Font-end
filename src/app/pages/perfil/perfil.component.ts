import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { PessoaUsuaria } from 'src/app/core/types/type';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  titulo = "Olá !";
  textoBotao = "ATUALIZAR";
  perfilComponent = true;

  token = '';
  nome = '';
  cadastro! : PessoaUsuaria;
  formulario!: FormGroup <any> | null;

  constructor(
    private tokenService : TokenService,
    private cadastroService: CadastroService,
    private formularioService: FormularioService,
    private router: Router,
    private UserService: UserService

  ) { }
 ngOnInit(): void {
    this.token = this.tokenService.recuperarToken() || '';
    this.cadastroService.buscarCadastro().subscribe( cadastro => {
     this.cadastro = cadastro;
      this.nome = this.cadastro.nome;
      this.carregarFormulario();
   } )
}

carregarFormulario() {
  this.formulario = this.formularioService.getCadastro() ;
  this.formulario?.patchValue({
    nome: this.cadastro.nome,
    nascimento: this.cadastro.nascimento,
    cpf: this.cadastro.cpf,
    telefone: this.cadastro.telefone,
    senha: this.cadastro.senha,
    email: this.cadastro.email,
    cidade: this.cadastro.cidade,
    estado: this.cadastro.estado,
    genero: this.cadastro.genero,

   })
}

atualizar() {
   const dadosAtualizados = {
    nome: this.formulario?.value.nome,
    nascimento: this.formulario?.value.nascimento,
    cpf: this.formulario?.value.cpf,
    telefone: this.formulario?.value.telefone,
    senha: this.formulario?.value.senha,
    email: this.formulario?.value.email,
    cidade: this.formulario?.value.cidade,
    estado: this.formulario?.value.estado,
    genero: this.formulario?.value.genero,
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
  this.UserService.logout();
  this.router.navigate(['/login']);
  // Limpar tokens do localStorage/sessionStorage/redirecionando para tela de login
  localStorage.removeItem('token');
    console.log("Deslogando...");
  }

}
