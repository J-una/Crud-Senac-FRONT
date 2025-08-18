import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario';
import { ClienteComponent } from './cliente/cliente';
import { ProdutoComponent } from './produto/produto';

export const routes: Routes = [
  { path: 'usuario', component: UsuarioComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'produto', component: ProdutoComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' } // redireciona para /usuario ao abrir
];