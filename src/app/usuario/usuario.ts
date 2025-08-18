import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

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

  ngOnInit(): void {
    // 🔹 simulação de chamada ao backend (substitua pelo service/HTTP)
    this.usuarios = [
      { id: 1, nome: 'Maria Silva', email: 'maria@email.com' },
      { id: 2, nome: 'João Santos', email: 'joao@email.com' },
      { id: 3, nome: 'Ana Costa', email: 'ana@email.com' }
    ];
    this.usuariosFiltrados = [...this.usuarios];
  }

  buscarUsuarios() {
    if (this.pesquisa.trim() === '') {
      this.usuariosFiltrados = [...this.usuarios];
    } else {
      this.usuariosFiltrados = this.usuarios.filter(u =>
        u.nome.toLowerCase().includes(this.pesquisa.toLowerCase()) ||
        u.email.toLowerCase().includes(this.pesquisa.toLowerCase())
      );
    }
  }

  cadastrar() {
    alert('Cadastrar novo usuário');
    // aqui você poderia abrir um modal ou navegar para /usuario/cadastrar
  }

  editar(usuario: Usuario) {
    alert(`Editar usuário: ${usuario.nome}`);
  }

  excluir(usuario: Usuario) {
    if (confirm(`Tem certeza que deseja excluir ${usuario.nome}?`)) {
      this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
      this.buscarUsuarios();
    }
  }
}