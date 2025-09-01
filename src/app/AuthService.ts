import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logadoSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('usuarioLogado'));
  logado$ = this.logadoSubject.asObservable();

  login(usuario: any) {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    this.logadoSubject.next(true);
  }

  logout() {
    localStorage.removeItem('usuarioLogado');
    this.logadoSubject.next(false);
  }
}