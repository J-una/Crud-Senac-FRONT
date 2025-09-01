import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuario.services';
import { Router } from '@angular/router';
import { Usuario } from '../const/Interface';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario.html',
  styleUrls: ['./usuario.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  usuariosFiltrados: Usuario[] = [];
  pesquisa: string = '';
  modalAberto = false;
  usuarioSelecionado: Usuario | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router) {}

  ngOnInit(): void {
    // 🔹 simulação de chamada ao backend (substitua pelo service/HTTP)
    this.buscarUsuarios();
    this.usuariosFiltrados = [...this.usuarios];
  }

  pesquisarUsuarios() {
  const termo = this.pesquisa.trim().toLowerCase();

  if (!termo) {
    // se a pesquisa estiver vazia, mostra todos
    this.usuariosFiltrados = [...this.usuarios];
    return;
  }

  this.usuariosFiltrados = this.usuarios.filter(u =>
    u.nome.toLowerCase().includes(termo) ||
    u.cpf.toLowerCase().includes(termo) ||
    u.perfil.toLowerCase().includes(termo)
  );
}

  buscarUsuarios() {
    console.log('Buscando usuários...');
    this.usuarioService.listar().subscribe({
      next: (res) => {
        this.usuarios = res.dados;
        this.usuariosFiltrados = [...res.dados];
        console.log('Usuários:', this.usuarios);
      },
      error: (err) => {
        console.error('Erro ao buscar usuários:', err);
      }
    });
  }

  cadastrar() {
  this.router.navigate(['/usuario/novo']);
}

editar(usuario: Usuario) {
  this.router.navigate(['/usuario/editar', usuario.idUsuario]);
}

  excluir(usuario: Usuario) {
    if (confirm(`Tem certeza que deseja excluir ${usuario.nome}?`)) {
      this.usuarios = this.usuarios.filter(u => u.idUsuario !== usuario.idUsuario);
      this.pesquisarUsuarios();
    }
  }

  formatarCpf(cpf: string): string {
    if (!cpf) return '';
    // Remove tudo que não for número
    cpf = cpf.replace(/\D/g, '');
    // Formata
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }




abrirModal(usuario: Usuario) {
  this.usuarioSelecionado = usuario;
  this.modalAberto = true;
}

fecharModal() {
  this.modalAberto = false;
  this.usuarioSelecionado = null;
}

confirmarExclusao() {
  if (!this.usuarioSelecionado) return;

  this.usuarioService.excluir(this.usuarioSelecionado.idUsuario).subscribe({
    next: () => {
      this.usuarios = this.usuarios.filter(u => u.idUsuario !== this.usuarioSelecionado?.idUsuario);
      this.buscarUsuarios();
      this.fecharModal();
    },
    error: (err) => {
      console.error("Erro ao excluir usuário", err);
      this.fecharModal();
    }
  });
}



}