import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  private apiUrl = 'https://localhost:7224/api/Autenticacao'; // ajuste a porta do seu backend

  constructor(private http: HttpClient) {}

  autenticar(cpf: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { cpf, senha });
  }
}