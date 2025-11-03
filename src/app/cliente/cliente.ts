import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../const/Interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente.html',
  styleUrls: ['./cliente.css']
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  pesquisa = '';
  modalAberto = false;
  clienteSelecionado: Cliente | null = null;

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.buscarClientes();
  }

  buscarClientes(): void {
    this.clienteService.listar().subscribe(res => {
      this.clientes = res.dados;
      this.clientesFiltrados = this.clientes.filter(c =>
        c.nome.toLowerCase().includes(this.pesquisa.toLowerCase())
      );
    });
  }
pesquisarClientes(): void {
  const termo = this.pesquisa.trim().toLowerCase();

  if (!termo) {
    // Se o campo de pesquisa estiver vazio, mostra todos
    this.clientesFiltrados = [...this.clientes];
    return;
  }

  this.clientesFiltrados = this.clientes.filter(c =>
    c.nome.toLowerCase().includes(termo) ||
    c.cpf.toLowerCase().includes(termo) ||
    c.email.toLowerCase().includes(termo)
  );
}



  formatarCpf(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  cadastrar(): void {
    this.router.navigate(['/cliente/novo']);
  }

  editar(cliente: Cliente): void {
    this.router.navigate(['/cliente/editar', cliente.idCliente]);
  }

  abrirModal(cliente: Cliente): void {
    this.clienteSelecionado = cliente;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.clienteSelecionado = null;
  }

  confirmarExclusao(): void {
    if (!this.clienteSelecionado) return;
    this.clienteService.excluir(this.clienteSelecionado.idCliente).subscribe(() => {
      this.buscarClientes();
      this.fecharModal();
    });
  }
}