import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuscaService } from '../services/form-busca.service';


@Component({
  selector: 'app-form-busca',
  templateUrl: './form-busca.component.html',
  styleUrls: ['./form-busca.component.scss']
})
export class FormBuscaComponent {

  @Output() realizarBusca = new EventEmitter()
  constructor(
    public formBuscaService: FormBuscaService
  ) {}

  buscar (){
    if( this.formBuscaService.formEstaValido){
   const formBuscavalue = this.formBuscaService.formBusca.value;
   this.realizarBusca.emit(formBuscavalue);

    }else {
      alert ("formulario de busca precisa esta preenchido")
    }


  }

}
