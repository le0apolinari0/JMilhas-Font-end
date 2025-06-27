import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { DadosBusca } from 'src/app/core/types/type';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class FormBuscaService {

  formBusca: FormGroup;

  constructor( private dialog: MatDialog) {
    const somenteIda = new FormControl(false,[Validators.required])
    const dataVolta =new FormControl (null,[Validators.required])


    this.formBusca = new FormGroup({
      somenteIda,
      origem: new FormControl(null, [Validators.required]),
      destino: new FormControl(null, [Validators.required]),
      tipo: new FormControl("Econômica"),
      adultos: new FormControl(1),
      criancas: new FormControl(0),
      bebes: new FormControl(0),
      dataIda: new FormControl(null, [Validators.required]),
      dataVolta,
      conexoes: new FormControl(null),
      companhias: new FormControl(null),
      precoMin: new FormControl(null),
      precoMax: new FormControl(null),

    })
     somenteIda.valueChanges.subscribe(somenteIda =>{
      if(somenteIda){
        dataVolta.disable();
        dataVolta.setValidators(null)
      }else{
        dataVolta.enable();
        dataVolta.setValidators([Validators.required])
      }
      dataVolta.updateValueAndValidity
    })
  }

  getDescricaoPassageiros (): string {
    let descricao = ''


    const adultos = this.formBusca.get('adultos')?.value;
    if (adultos && adultos > 0) {
      descricao += `${adultos} adulto${adultos > 1 ? 's' : ''}`;
    }

    const criancas = this.formBusca.get('criancas')?.value;
    if (criancas && criancas > 0) {
      descricao += `${descricao ? ', ' : ''}${criancas} criança${criancas > 1 ? 's' : ''}`;
    }

    const bebes = this.formBusca.get('bebes')?.value;
    if (bebes && bebes > 0) {
      descricao += `${descricao ? ', ' : ''}${bebes} bebê${bebes > 1 ? 's' : ''}`;
    }

    return descricao
  }


  obterControle(nome:string): FormControl {
    const control = this.formBusca.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl;
  }
 obterDadosBusca(): DadosBusca {
  const dataIdaControl = this.obterControle('dataIda');
  const dadosBusca: DadosBusca = {
    pagina: 1,
      porPagina: 50,
      dataIda: dataIdaControl.value.toISOString(),
      passageirosAdultos: this.obterControle('adultos').value,
      passageirosCriancas: this.obterControle('criancas').value,
      passageirosBebes: this.obterControle('bebes').value,
      somenteIda: this.obterControle('somenteIda').value,
      origemId: this.obterControle('origem').value.id,
      destinoId: this.obterControle('destino').value.id,
      tipo: this.obterControle('tipo').value,
  }
  const dataVoltaControl = this.obterControle('dataVolta');
    if (dataVoltaControl.value) {
      dadosBusca.dataVolta = dataVoltaControl.value.toISOString();
    }
    const conexoesControl = this.obterControle('conexoes');
    if(conexoesControl.value){
      dadosBusca.conexoes = conexoesControl.value;
    }
    const companhiasControl = this.obterControle('companhias');
    if(companhiasControl.value){
      dadosBusca.companhiasId = companhiasControl.value
    }
    const precoMinControl = this.obterControle('precoMin')
    if(precoMinControl.value){
      dadosBusca.precoMin = precoMinControl.value
    }
    const precoMaxControl = this.obterControle('precoMin')
    if(precoMaxControl.value){
      dadosBusca.precoMax = precoMaxControl.value
    }
    return dadosBusca
  }


  alterarTipo(evento: MatChipSelectionChange, tipo: string){
    if (evento.selected){
      this.formBusca.patchValue({ tipo, })
    }
  console.log('tipo de passagem alterada para:', tipo)
  }

  openDialog() {
    this.dialog.open(ModalComponent, {
      width: '50%'
    })
  }

  trocarOrigemDestino(): void {
      const origem = this.formBusca.get('origem')?.value;
      const destino = this.formBusca.get('destino')?.value;

      this.formBusca.patchValue({
        origem: destino,
        destino: origem
      });
    }
    atualizarValores(valores: any) {
      this.formBusca.patchValue(valores);
    }
    definirValores(valores: any) {
      this.formBusca.setValue({
        somenteIda: valores.somenteIda,
        origem: valores.origem,
        destino: valores.destino,
        tipo: valores.tipo,
        adultos: valores.adultos,
        criancas: valores.criancas,
        bebes: valores.bebes
      });
    }
    getValorCampo(nome: string) {
      return this.formBusca.get(nome)?.value;
    }

    get formEstaValido(){
      return this.formBusca.valid
    }
}

