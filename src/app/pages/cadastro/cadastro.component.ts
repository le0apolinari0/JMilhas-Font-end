import { Component, OnInit } from '@angular/core';
import { FormularioService } from './../../core/services/formulario.service';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { PessoaUsuaria } from 'src/app/core/types/type';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHandler, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  perfilComponent = false;
  cadastroForm: any;

  constructor(
    private formularioService: FormularioService,
    private cadastroService: CadastroService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cadastroForm = this.formularioService.getCadastro();
  }

  cadastrar() {
    if (this.cadastroForm?.valid) {
      const novocadastro = this.cadastroForm.getRawValue() as PessoaUsuaria;
      console.log('Dados do cadastro:', novocadastro);
      this.cadastroService.cadastrar(novocadastro).subscribe({
        next: (response) => {
          console.log('Cadastro realizado com sucesso!', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Erro ao realizar cadastro:', error);
          alert('Erro ao realizar cadastro. Por favor, tente novamente.');
        }
      });
    }
  }
}
