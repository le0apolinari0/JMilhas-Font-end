import { Injectable } from '@angular/core';

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  possuiToken(): boolean {
    return !!this.recuperarToken();
  }

  salvarToken(token: string): void {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Erro ao salvar token:', error);
    }
  }

  removerToken(): void {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Erro ao remover token:', error);
    }
  }

  recuperarToken(): string | null {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Erro ao recuperar token:', error);
      return null;
    }
  }
}



