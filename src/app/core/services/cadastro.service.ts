import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PessoaUsuaria } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  cadastrar(pessoaUsuaria: PessoaUsuaria): Observable<PessoaUsuaria> {
    return this.http.post<PessoaUsuaria>(`${this.apiUrl}/auth/cadastro`, pessoaUsuaria);
  }

  buscarCadastro(): Observable<PessoaUsuaria> {

  return this.http.get<PessoaUsuaria>(`${this.apiUrl}/auth/perfil`);
  }
  atualizarCadastro(pessoaUsuaria: PessoaUsuaria): Observable<PessoaUsuaria> {

    return this.http.patch<PessoaUsuaria>(`${this.apiUrl}/auth/perfil`, pessoaUsuaria);
  }
  excluirCadastro(token: string): Observable<void> {

    return this.http.delete<void>(`${this.apiUrl}/auth/perfil`);
  }

  // atualizarSenha(novaSenha: string): Observable<void> {
  //   return this.http.put<void>(`${this.apiUrl}/auth/senha`, { senha: novaSenha });
  // }
}
