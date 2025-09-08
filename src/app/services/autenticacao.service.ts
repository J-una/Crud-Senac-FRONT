import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private apiUrl = 'https://localhost:44363/api/Autenticacao'; // ajuste a porta do seu backend

  constructor(private http: HttpClient) {}

  autenticar(cpf: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { cpf, senha });
  }

  solicitarRecuperacao(email: string): Observable<string> {
  return this.http.post(`${this.apiUrl}/solicitar-recuperacao`, { email }, { responseType: 'text' });
  }

  redefinirSenha(token: string, novaSenha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/redefinir-senha`, { token, novaSenha });
  }
}