import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class Inicio {

   logado = false;

   constructor(
    private routermodule: RouterModule,
    private authService: AuthService,
    private router: Router
   ) {
  }

  ngOnInit() {
    this.authService.logado$.subscribe(status => {
      this.logado = status;
      console.log('Usuário logado:', this.logado);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}