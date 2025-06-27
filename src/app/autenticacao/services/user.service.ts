import { Injectable } from '@angular/core';
import { TokenService } from '../../autenticacao/services/token.service';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { PessoaUsuaria } from 'src/app/core/types/type';


@Injectable({
  providedIn: 'root'
})
export class UserService {

   private userSubject = new BehaviorSubject<PessoaUsuaria | null>(null);

  constructor(
  private tokenService: TokenService
  ) {
    if (this.tokenService.possuiToken()) {
      this.decodificaJwtUsuario();
    }
   }

decodificaJwtUsuario(): void {
  const token = this.tokenService.recuperarToken();
    const user = jwtDecode(token!) as PessoaUsuaria;
  // O operador de asserção não nula (!) é usado aqui para garantir que o token não seja nulo.
  //  Mais caso seja null terá um erro em tempo de execução.
    this.userSubject.next(user);

  //  const token = this.tokenService.recuperarToken();
  // if (token) {
  //   const user = jwtDecode(token) as PessoaUsuaria;
  //   this.userSubject.next(user);
  // } else {
  //   // Lide com o caso em que o token é nulo
  //   // if (token) é uma abordagem mais segura e explícita.
  //   this.userSubject.next(null);
  // }

}
 recuperarToken(){
  return this.userSubject.asObservable();
 }

 salvarToken(token: string): void {
    this.tokenService.salvarToken(token);
    this.decodificaJwtUsuario();
  }

  logout(): void {
    this.tokenService.removerToken();
    this.userSubject.next(null);
  }

  estaLogado(): boolean {
    return this.tokenService.possuiToken();
  }

}
