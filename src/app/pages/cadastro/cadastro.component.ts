import { Component } from '@angular/core';
import { __values } from 'tslib';
import { FormularioService } from './../../core/services/formulario.service';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { PessoaUsuaria } from 'src/app/core/types/type';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {
perfilComponent= false

constructor(
  private formularioService: FormularioService,
  private cadastroService: CadastroService
) {}

cadastrar(){
 const formCadastro = this.formularioService.getCadastro()

if (formCadastro?.valid) {
  const novocadastro = formCadastro.getRawValue() as PessoaUsuaria;
   console.log('Dados do cadastro:', novocadastro);
  this.cadastroService.cadastrar(novocadastro).subscribe({
    next: (response) => {
      console.log('Cadastro realizado com sucesso!', response);
    },
    error: (error) => {
      console.error('Erro ao realizar cadastro:', error);
      alert('Erro ao realizar cadastro. Por favor, tente novamente.');
    }
  });
  }
 }
}
