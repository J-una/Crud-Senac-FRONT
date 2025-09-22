import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');

    if (!usuario || !usuario.token) {
      this.router.navigate(['/login']);
      return false;
    }

    const perfisPermitidos = route.data['perfisPermitidos'] as string[];
    if (perfisPermitidos && !perfisPermitidos.includes(usuario.perfil)) {
      alert('Acesso negado! Apenas administradores podem acessar.');
      this.router.navigate(['/login']); // ou redireciona para outra página
      return false;
    }

    return true;
  }
}
