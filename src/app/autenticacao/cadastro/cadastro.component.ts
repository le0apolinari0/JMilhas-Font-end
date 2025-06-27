import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../../core/services/formulario.service';
import { PessoaUsuaria } from 'src/app/core/types/type';
import { Router } from '@angular/router';
import { CadastroService } from '../services/cadastro.service';
import { HomeComponent } from 'src/app/home/home.component';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent  {


  constructor(
    private formularioService: FormularioService,
    private cadastroService: CadastroService,
    private router: Router
  ) { }

  cadastrar() {
     const cadastroForm = this.formularioService.getCadastro();
    if (cadastroForm?.valid) {
      const novocadastro = cadastroForm.getRawValue() as PessoaUsuaria;
      console.log('Dados do cadastro:', novocadastro);
      this.cadastroService.cadastrar(novocadastro).subscribe({
        next: (response) => {

          this.router.navigate(['auth/login']);
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
