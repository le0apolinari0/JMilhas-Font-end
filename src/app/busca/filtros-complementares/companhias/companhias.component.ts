import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CompanhiaService } from 'src/app/busca/services/companhia.service';
import { Companhia } from 'src/app/core/types/type';
import { FormBuscaService } from 'src/app/shared/services/form-busca.service';

@Component({
  selector: 'app-companhias',
  templateUrl: './companhias.component.html',
  styleUrls: ['./companhias.component.scss']
})
export class CompanhiasComponent implements OnInit {
  companhias: Companhia[] = [];
  selecionadas: Companhia[] = [];

  companhiasControl: FormControl<number[] | null>

  constructor(
    private companhiaService: CompanhiaService,
    private formBuscaService: FormBuscaService
  ) {

    this.companhiasControl = this.formBuscaService.obterControle('companhias')

  }
  ngOnInit(): void {
    this.companhiaService.listar().subscribe(
      res => {
        this.companhias = res;
      }
    )
    this.companhiasControl.valueChanges.subscribe(value => {
      if (!value) {
        this.selecionadas = []
      }
    })
  }

  alternarCompanhia(companhia: Companhia, checked: boolean): void {
    if (!checked) {
      this.selecionadas = this.selecionadas.filter(comp => comp != companhia)
    } else {
      this.selecionadas.push(companhia)
    }
    this.formBuscaService.formBusca.patchValue({
      companhias: this.selecionadas.map(comp => Number(comp.id))
    })
  }
  companhiaSelecionada(companhia: Companhia): boolean {

    return this.selecionadas.includes(companhia)
  }
}
