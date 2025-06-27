import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs';
import { PassagensService } from './services/passagens.service';
import { FormBuscaService } from '../shared/services/form-busca.service';
import { DadosBusca, Destaques, Passagem } from '../core/types/type';




@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss'],

})

export class BuscaComponent implements OnInit {
  passagens: Passagem[] = [];
  destaques?: Destaques;

  constructor(
    private passagensService: PassagensService,
    private formBuscaService: FormBuscaService
  ) { }

  ngOnInit(): void {
    const buscaPadrao = {
      data: new Date().toISOString(),
      pagina: 1,
      porPagina: 25,
      somenteIda: false,
      passageirosAdultos: 1,
      tipo: "Executiva",
    };
    const busca = this.formBuscaService.formEstaValido ? this.formBuscaService.obterDadosBusca() : buscaPadrao;
    this.passagensService.buscaPassagens(busca).pipe(take(1))
      .subscribe(res => {
        this.passagens = res.resultado;
        this.formBuscaService.formBusca.patchValue({
          precoMin: res.precoMin,
          precoMax: res.precoMax,
        });
        this.obterDestaques();
      });
  }

  busca(dadosBusca: DadosBusca) {
    this.passagensService.buscaPassagens(dadosBusca).subscribe(res => {
      this.passagens = res.resultado;
      this.obterDestaques();
    });
  }

  obterDestaques() {
    this.destaques = this.passagensService.obterPassagensDestaques(this.passagens);
  }
}
