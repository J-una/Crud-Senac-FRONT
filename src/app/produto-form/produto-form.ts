import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../const/Interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produto-form.html',
  styleUrls: ['./produto-form.css']
})
export class ProdutoFormComponent implements OnInit {
  formProduto!: FormGroup;
  ehEdicao = false;
  idProduto!: string;
  private idUsuario: string = '';

  tiposPreDefinidos = ['Eletrônico', 'Alimento', 'Roupas', 'Móvel', 'Outro'];

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (usuarioLogado) {
      const usuario = JSON.parse(usuarioLogado);
      this.idUsuario = usuario.idUsuario || '';
      console.log('Usuário logado:', usuario);
    }

    this.formProduto = this.fb.group({
      nome: ['', Validators.required],
      marca: ['', Validators.required],
      tipo: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0.01)]],
      quantidade: [0, [Validators.required, Validators.min(1)]]
    });

    this.idProduto = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.idProduto) {
      this.ehEdicao = true;
      this.carregarProduto();
    }
  }

  carregarProduto() {
    this.produtoService.listarId(this.idProduto).subscribe(res => {
      this.formProduto.patchValue({
        nome: res.dados.nome,
        marca: res.dados.marca,
        tipo: res.dados.tipo,
        preco: res.dados.preco,
        quantidade: res.dados.quantidade
      });
    });
  }

  salvar() {
    if (this.formProduto.invalid) return;

    const produto: Produto = {
      ...this.formProduto.getRawValue(),
      idUsuario: this.idUsuario,
    };

    if (this.ehEdicao) {
      this.produtoService.editar(this.idProduto, produto).subscribe(() => {
        this.router.navigate(['/produto']);
      });
    } else {
      this.produtoService.cadastrar(produto).subscribe(() => {
        this.router.navigate(['/produto']);
      });
    }
  }

  voltar() {
    this.router.navigate(['/produto']);
  }
}
