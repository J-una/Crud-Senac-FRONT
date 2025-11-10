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
      preco: [null, [Validators.required, Validators.min(0.01)]],
      quantidade: [null, [Validators.required, Validators.min(1)]]
    });

    this.idProduto = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.idProduto) {
      this.ehEdicao = true;
      this.carregarProduto();
    }
  }

  carregarProduto() {
    this.produtoService.listarId(this.idProduto).subscribe(res => {
      const preco = res.dados.preco?.toString().replace('.', ',');
      const precoFormatado = preco.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      this.formProduto.patchValue({
        nome: res.dados.nome,
        marca: res.dados.marca,
        tipo: res.dados.tipo,
        preco: precoFormatado,
        quantidade: res.dados.quantidade
      });
    });
  }
  
  validarQuantidade(event: any) {
  const valor = event.target.value;
  if (valor < 0) {
    event.target.value = 0;
    this.formProduto.get('quantidade')?.setValue(0);
  }
}

bloquearNegativo(event: KeyboardEvent) {
  if (event.key === '-' || event.key === '+' || event.key === 'e' || event.key === 'E') {
    event.preventDefault(); 
  }
}

  formatarPreco(event: any) {
    let valor = event.target.value;

    valor = valor.replace(/\D/g, '');

    if (valor === '') {
      event.target.value = '';
      this.formProduto.get('preco')?.setValue('');
      return;
    }

    valor = (parseInt(valor, 10) / 100).toFixed(2) + '';

    valor = valor.replace('.', ',');

    valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    event.target.value = valor;

    this.formProduto.get('preco')?.setValue(valor, { emitEvent: false });
  }

  salvar() {
    if (this.formProduto.invalid) return;


    const precoMascarado = this.formProduto.get('preco')?.value || '0';

    // Converte "1.234,56" → 1234.56
    const precoNumerico = parseFloat(
      precoMascarado.toString().replace(/\./g, '').replace(',', '.')
    );

    // Atualiza o form com o valor numérico
    this.formProduto.patchValue({ preco: precoNumerico });
    
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
