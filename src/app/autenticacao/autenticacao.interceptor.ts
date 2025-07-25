import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './services/token.service';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(
  private tokenService : TokenService,

  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.tokenService.possuiToken();
    const token = this.tokenService.recuperarToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
