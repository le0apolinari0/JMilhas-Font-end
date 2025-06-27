import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MensagemService } from '../services/mensagem.service';

@Injectable()
export class ErrosInterceptor implements HttpInterceptor {

  constructor(
    private mensagemService: MensagemService
  ) {}

  intercept(
    request: HttpRequest<HttpErrorResponse>, 
    next: HttpHandler): Observable<HttpEvent<HttpErrorResponse>> {

      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse)=> {

        let errorMessage = "Ocorreu um erro desconhecido";

        if (error.error instanceof ErrorEvent) {
          errorMessage = ` Erro do Cliente: ${error.error.message}`
        } else if (error.status === 404){
           errorMessage = " Erro Recursos não encontrados  "
        } else if (error.status === 500){
           errorMessage = " Erro no Servidor "
        }else if (error.status === 401){
           errorMessage = " Usuario não tem autorização para acessar este recurso  "
        }

      this.mensagemService.openSnackBar(errorMessage);

          return throwError(() => Error( "Ops, Houve um Erro!"))
        })
      );
  }
}
