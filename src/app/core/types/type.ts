export interface Promocao {
    id: number
    destino: string
    imagem: string
    preco: number
}

export interface UnidadeFederativa {
  id: number;
  nome: string;
  sigla: string;
}

export interface Depoimento {

  id: number;
  texto: string;
  autor: string;
  avatar: string;

}

export interface PessoaUsuaria {
  nome: string;
  nascimento: string;
  cpf: string;
  telefone: string;
  email: string;
  senha: string;
  cidade: string;
  estado: UnidadeFederativa;
  genero: string;

}

export interface ResultadoBusca {
  paginaAtual: number;
  ultimaPagina: number;
  precoMin: number;
  precoMax: number;
  total: number;
  resultado: Passagem[];
}

export interface Passagem{
    tipo: string;
    precoIda: number;
    precoVolta: number;
    textoIdaVolta: number;
    taxaEmbarque: number;
    conexoes: number;
    tempoVoo: number;
    origem: UnidadeFederativa;
    destino: UnidadeFederativa;
    companhia: Companhia;
    dataIda: Date;
    dataVolta: Date;
    total: number;
    orcamento: Orcamento[];
}

export interface Orcamento {
    id: number;
    nome: string;
    valor: number;
    taxa: number;
    total: number
}
export interface Companhia {
   nome: any;
   id: number
   descricao: string;
   preco: number;
   taxaEmbarque: number;
   total: number;
}

export interface DadosBusca{
    somenteIda?: boolean;
    passageirosAdultos?: number;
    passageirosCriancas?: number;
    passageirosBebes?: number;
    tipo?: string;
    origemId?: number;
    destinoId?: number;
    precoMin?: number;
    precoMax?: number;
    conexoes?: number;
    tempoVoo?: number;
    dataIda?: string;
    dataVolta?: string;
    companhiasId?: number[];
    pagina: number;
    porPagina: number;
}

export interface Destaques {
    maisRapida: Passagem;
    maisBarata: Passagem;
    sugerida: Passagem;
}
