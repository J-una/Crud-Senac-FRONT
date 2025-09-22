import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class Inicio {
  logado = false;
  usuario: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.logado$.subscribe(status => {
      this.logado = status;
      const user = localStorage.getItem('usuarioLogado');
      this.usuario = user ? JSON.parse(user) : null;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
