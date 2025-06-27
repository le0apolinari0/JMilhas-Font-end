import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/autenticacao/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
constructor(
  private formBuilder: FormBuilder,
  private authService: AutenticacaoService,
  private router: Router

) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
        email: ['', [
       Validators.required,
       Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail|outlook|hotmail|yahoo|bol|uol|ig|terra|globo)\.(com|com\.br|br)$/)
    ]],
      senha: [null, [
        Validators.required,
         Validators.minLength(3), 
         Validators.maxLength(10)]]
    });

  }
login(){
 
  const email = this.loginForm.value.email;
  const senha = this.loginForm.value.senha;
  this.authService.autenticar(email, senha).subscribe({
    next: (response) => {
      console.log("Login realizado com sucesso", response);
      this.router.navigateByUrl('/');
      this.loginForm.reset();
    },
    error: (error) => {
      console.error("Erro ao realizar login", error);
      if (error.status === 404) {
        this.loginForm.get('email')?.setErrors({ emailNaoEncontrado: true });
      } else if (error.status === 401) {
        this.loginForm.get('email')?.setErrors({ emailInvalido: true });
        this.loginForm.get('senha')?.setErrors({ senhIncorreta: true });
      }
    }
  });
}
}


