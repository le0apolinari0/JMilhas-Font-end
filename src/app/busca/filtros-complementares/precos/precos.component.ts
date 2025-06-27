import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PassagensService } from '../../services/passagens.service';
import { FormBuscaService } from 'src/app/shared/services/form-busca.service';

@Component({
  selector: 'app-precos',
  templateUrl: './precos.component.html',
  styleUrls: ['./precos.component.scss']
})
export class PrecosComponent {
  precoMin: FormControl
  precoMax: FormControl

  constructor(
    public passagemService: PassagensService,
    private formBuscaService: FormBuscaService
  ){
    this.precoMin = this.formBuscaService.obterControle('precoMin')
    this.precoMax = this.formBuscaService.obterControle('precoMax')
  }
}
