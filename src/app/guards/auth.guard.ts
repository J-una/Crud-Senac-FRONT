import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const usuario = localStorage.getItem('usuarioLogado'); // pega usuário logado
    if (usuario) {
      return true; // permite acesso
    } else {
      this.router.navigate(['/login']); // redireciona para login
      return false;
    }
  }
}