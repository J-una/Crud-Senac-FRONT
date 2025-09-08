import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario';
import { ClienteComponent } from './cliente/cliente';
import { ProdutoComponent } from './produto/produto';
import { UsuarioFormComponent } from './usuario-form/usuario-form';
import { ClienteFormComponent } from './cliente-form/cliente-form';
import { ProdutoFormComponent } from './produto-form/produto-form';
import { LoginComponent } from './login/login';
import { AuthGuard } from './guards/auth.guard';
import { EsqueciSenhaComponent } from './esqueci-senha/esqueci-senha';
import { RedefinirSenhaComponent } from './redefinir-senha/redefinir-senha';

// export const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'usuario', component: UsuarioComponent },
//   { path: 'cliente', component: ClienteComponent },
//   { path: 'produto', component: ProdutoComponent },
//   { path: 'usuario/novo', component: UsuarioFormComponent },
//   { path: 'usuario/editar/:id', component: UsuarioFormComponent },
//   { path: 'cliente/novo', component: ClienteFormComponent },
//   { path: 'cliente/editar/:id', component: ClienteFormComponent },  
//   { path: 'produto/novo', component: ProdutoFormComponent },
//   { path: 'produto/editar/:id', component: ProdutoFormComponent },
//   { path: '', redirectTo: '/login', pathMatch: 'full' } // abrir login por padrão
//   // { path: '', redirectTo: '/inicio', pathMatch: 'full' } // redireciona para /usuario ao abrir
// ];

//AuthGuard e feito para proteger as rotas que precisam de autenticação
export const routes: Routes = [
  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'produto', component: ProdutoComponent, canActivate: [AuthGuard] },
  { path: 'usuario/novo', component: UsuarioFormComponent, canActivate: [AuthGuard] },
  { path: 'usuario/editar/:id', component: UsuarioFormComponent, canActivate: [AuthGuard] },
  { path: 'cliente/novo', component: ClienteFormComponent, canActivate: [AuthGuard] },
  { path: 'cliente/editar/:id', component: ClienteFormComponent, canActivate: [AuthGuard] },  
  { path: 'produto/novo', component: ProdutoFormComponent, canActivate: [AuthGuard] },
  { path: 'produto/editar/:id', component: ProdutoFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'recuperar-senha', component: EsqueciSenhaComponent },
  { path: 'redefinir-senha', component: RedefinirSenhaComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];