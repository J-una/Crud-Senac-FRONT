import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.services';
import { Usuario } from '../const/Interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-form',
  standalone: true, // <- importante
  imports: [CommonModule, ReactiveFormsModule], // <- adiciona aqui
  templateUrl: './usuario-form.html',
  styleUrls: ['./usuario-form.css']
})
export class UsuarioFormComponent implements OnInit {
  formUsuario!: FormGroup;
  ehEdicao = false;
  idUsuario!: string;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formUsuario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      senha: [''],
      perfil: ['', Validators.required]
    });

    // Se tiver ID na rota, é edição
    this.idUsuario = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.idUsuario) {
      this.ehEdicao = true;
      this.carregarUsuario();
      this.formUsuario.get('cpf')?.disable();
    }
  }

 carregarUsuario() {
  this.usuarioService.listarId(this.idUsuario).subscribe(res => {
    console.log('Usuário carregado para edição:', res);
    this.formUsuario.patchValue({
      nome: res.dados.nome,
      email: res.dados.email,
      cpf: res.dados.cpf,
      perfil: res.dados.perfil
      // senha não preenche (segurança)
    });
  });
}

  salvar() {
    if (this.formUsuario.invalid) return;

    const usuario = this.formUsuario.getRawValue();

    if (this.ehEdicao) {
      this.usuarioService.editar(this.idUsuario, usuario).subscribe(() => {
        this.router.navigate(['/usuario']);
      });
    } else {
      this.usuarioService.cadastrar(usuario).subscribe(() => {
        this.router.navigate(['/usuario']);
      });
    }
  }

  voltar() {
    this.router.navigate(['/usuario']);
  }
}
