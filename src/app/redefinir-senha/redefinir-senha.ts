import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutenticacaoService } from '../services/autenticacao.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.html',
  styleUrls: ['./redefinir-senha.css'],
   imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class RedefinirSenhaComponent {
  form: FormGroup;
  mensagem = '';
  token: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: AutenticacaoService
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    this.form = this.fb.group({
      novaSenha: ['', Validators.required]
    });
  }

  redefinir() {
    if (this.form.invalid) return;
    this.auth.redefinirSenha(this.token, this.form.value.novaSenha).subscribe(res => {
      this.mensagem = res;
    });
  }
}
