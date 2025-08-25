import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../const/Interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './produto.html',
  styleUrls: ['./produto.css']
})
export class ProdutoComponent implements OnInit {
  produtos: Produto[] = [];
  produtosFiltrados: Produto[] = [];
  pesquisa = '';
  modalAberto = false;
  produtoSelecionado: Produto | null = null;

  constructor(private produtoService: ProdutoService, private router: Router) {}

  ngOnInit(): void {
    this.pesquisarProdutos();
  }

  pesquisarProdutos(): void {
    this.produtoService.listar().subscribe(res => {
      this.produtos = res.dados;
      this.produtosFiltrados = this.produtos.filter(p =>
        p.nome.toLowerCase().includes(this.pesquisa.toLowerCase())
      );
    });
  }

  cadastrar(): void {
    this.router.navigate(['/produtos/novo']);
  }

  editar(produto: Produto): void {
    this.router.navigate(['/produtos/editar', produto.idProduto]);
  }

  abrirModal(produto: Produto): void {
    this.produtoSelecionado = produto;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.produtoSelecionado = null;
  }

  confirmarExclusao(): void {
    if (!this.produtoSelecionado) return;
    this.produtoService.excluir(this.produtoSelecionado.idProduto).subscribe(() => {
      this.pesquisarProdutos();
      this.fecharModal();
    });
  }
}
