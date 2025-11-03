import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../const/Interface';


interface UsuarioResponse {
  dados: Usuario[];
  mensagem: string;
  status: boolean;
}
interface UsuarioSingleResponse {
  dados: Usuario;
  mensagem: string;
  status: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://localhost:44363/api/Usuario'; // ajuste conforme sua API

  constructor(private http: HttpClient) {}

  listar(): Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${this.apiUrl}/buscar-usuarios`);
  }
  
  listarId(id: string): Observable<UsuarioSingleResponse> {
  return this.http.get<UsuarioSingleResponse>(`${this.apiUrl}/buscar-usuario/${id}`);
}

  cadastrar(usuario: Usuario): Observable<Usuario> {
  return this.http.post<Usuario>(`${this.apiUrl}/adicionar-usuario`, usuario);
}

  editar(id: string, usuario: Usuario): Observable<void> {
  return this.http.put<void>(`${this.apiUrl}/editar-usuario?id=${id}`, usuario);
}

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/inativar-usuario/${id}`);
  }
  verificarDuplicado(campo: string, valor: string, id?: string) {
  let params = new URLSearchParams();
  params.append(campo, valor);
  if (id) params.append('id', id); // 🔹 inclui o ID apenas se houver

  return this.http.get<any>(`${this.apiUrl}/verificar-duplicado?${params.toString()}`);
}
}