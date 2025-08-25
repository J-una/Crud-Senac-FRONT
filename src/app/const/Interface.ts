export interface Usuario {
  idUsuario: string;
  nome: string;
  cpf: string;
  senha: string;
  perfil: string;
  dataCriacao: Date;
  dataAlteracao: Date;
  ativo: boolean;
}

export interface Cliente {
  idCliente: string;
  nome: string;
  cpf: string;
  email: string;
  senha: string;
  dataCriacao: Date;
  dataAlteracao?: Date;
  ativo: boolean;
  idUsuario: string;
}

export interface Produto {
  idProduto: string;
  nome: string;
  marca: string;
  tipo: string;
  preco: number;
  quantidade: number;
  dataCriacao: Date;
  dataAlteracao?: Date;
  ativo: boolean;
  idUsuario: string;
}