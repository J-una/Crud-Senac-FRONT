import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../const/Interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()], 
  templateUrl: './cliente-form.html',
  styleUrls: ['./cliente-form.css']
})
export class ClienteFormComponent implements OnInit {
  formCliente!: FormGroup;
  ehEdicao = false;
  idCliente!: string;
  private idUsuario: string = '';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
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
    
    this.formCliente = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: [''] // só no cadastro
    });

    // Se tiver ID na rota, é edição
    this.idCliente = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.idCliente) {
      this.ehEdicao = true;
      this.carregarCliente();
      this.formCliente.get('cpf')?.disable();
    }
  }

  carregarCliente() {
    this.clienteService.listarId(this.idCliente).subscribe(res => {
      console.log('Cliente carregado para edição:', res);
      this.formCliente.patchValue({
        nome: res.dados.nome,
        cpf: res.dados.cpf,
        email: res.dados.email
        // senha não preenche por segurança
      });
    });
  }

  salvar() {
    if (this.formCliente.invalid) return;

      const cliente = {
        ...this.formCliente.getRawValue(),
        idUsuario: this.idUsuario  // pega o usuário fixo ou logado
        };

    if (this.ehEdicao) {
      this.clienteService.editar(this.idCliente, cliente).subscribe(() => {
        this.router.navigate(['/cliente']);
      });
    } else {
      this.clienteService.cadastrar(cliente).subscribe(() => {
        this.router.navigate(['/cliente']);
      });
    }
  }

  voltar() {
    this.router.navigate(['/cliente']);
  }
}
