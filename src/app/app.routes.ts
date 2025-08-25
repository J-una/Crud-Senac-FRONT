import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario';
import { ClienteComponent } from './cliente/cliente';
import { ProdutoComponent } from './produto/produto';
import { UsuarioFormComponent } from './usuario-form/usuario-form';

export const routes: Routes = [
  { path: 'usuario', component: UsuarioComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'produto', component: ProdutoComponent },
  { path: 'usuario/novo', component: UsuarioFormComponent },
  { path: 'usuario/editar/:id', component: UsuarioFormComponent }, 
  { path: '', redirectTo: '/inicio', pathMatch: 'full' } // redireciona para /usuario ao abrir
];