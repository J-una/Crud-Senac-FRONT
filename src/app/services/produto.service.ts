import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../const/Interface';

interface ProdutoResponse {
  dados: Produto[];
  mensagem: string;
  status: boolean;
}

interface ProdutoSingleResponse {
  dados: Produto;
  mensagem: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'https://localhost:7224/api/Produto';

  constructor(private http: HttpClient) {}

  listar(): Observable<ProdutoResponse> {
    return this.http.get<ProdutoResponse>(`${this.apiUrl}/buscar-produtos`);
  }

  listarId(id: string): Observable<ProdutoSingleResponse> {
    return this.http.get<ProdutoSingleResponse>(`${this.apiUrl}/buscar-produto/${id}`);
  }

  cadastrar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(`${this.apiUrl}/adicionar-produto`, produto);
  }

  editar(id: string, produto: Produto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/editar-produto?id=${id}`, produto);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/inativar-produto/${id}`);
  }
}