import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { UnidadeFederativa } from 'src/app/core/types/type';
import { FormValidations } from '../form-validations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss']
})
export class FormBaseComponent implements OnInit{
  cadastroForm!: FormGroup;
  estadoControl = new FormControl<UnidadeFederativa | null>(null, Validators.required);

  @Input() titulo: string = 'Crie sua conta';
  @Input() textoBotao: string = 'CADASTRAR';
  @Input() perfilComponent = false;
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>();
  @Output() sair: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    private formBuilder: FormBuilder,
    private formularioService: FormularioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nome: [null, Validators.required],
      nascimento: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      cidade: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(3)]],
      genero: ['outro'],
      telefone: [null, Validators.required],
      estado: this.estadoControl,
      confirmarEmail: [null, [Validators.required, Validators.email , FormValidations.equalTo("email")]],
      confirmarSenha: [null, [Validators.required, Validators.minLength(3), FormValidations.equalTo("senha")]],
      aceitarTermos: [false, [Validators.requiredTrue]]
    });

    if (this.perfilComponent) {
    this.cadastroForm.get('aceitarTermos')?.setValidators(null);
    }else {
      this.cadastroForm.get('aceitarTermos')?.setValidators([Validators.requiredTrue]);
    }
      this.cadastroForm.get('aceitarTermos')?.updateValueAndValidity();
      this.formularioService.setCadastro(this.cadastroForm);
      console.log(this.cadastroForm);
  }

  executarAcao(){
  console.log(this.cadastroForm.valid);
  if (!this.cadastroForm.valid) {
    console.log(this.cadastroForm.errors);
  }
  this.acaoClique.emit();
}
deslogar() {
this.sair.emit();

// Limpar tokens do localStorage/sessionStorage/redirecionando para tela de login
localStorage.removeItem('token');
sessionStorage.removeItem('token');
// this.router.navigate(['/login']);

if (this.perfilComponent) {
  console.log("Deslogado com sucesso do perfil");
} else {
  console.log("Deslogado com sucesso");
}
 }
}
