import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../const/Interface';

interface ClienteResponse {
  dados: Cliente[];
  mensagem: string;
  status: boolean;
}

interface ClienteSingleResponse {
  dados: Cliente;
  mensagem: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'https://localhost:7224/api/Cliente';

  constructor(private http: HttpClient) {}

  listar(): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(`${this.apiUrl}/buscar-clientes`);
  }

  listarId(id: string): Observable<ClienteSingleResponse> {
    return this.http.get<ClienteSingleResponse>(`${this.apiUrl}/buscar-cliente/${id}`);
  }

  cadastrar(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/adicionar-cliente`, cliente);
  }

  editar(id: string, cliente: Cliente): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/editar-cliente?id=${id}`, cliente);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/inativar-cliente/${id}`);
  }
}