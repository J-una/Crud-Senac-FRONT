import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutenticacaoService } from '../services/autenticacao.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.html',
  styleUrls: ['./esqueci-senha.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class EsqueciSenhaComponent {
  form: FormGroup;
  mensagem = '';
  erro = '';

  constructor(
    private fb: FormBuilder,
    private auth: AutenticacaoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  enviar() {
    console.log("Enviando...");
    if (this.form.invalid) return;
    console.log("Form valid");
    this.mensagem = '';
    this.erro = '';

    this.auth.solicitarRecuperacao(this.form.value.email).subscribe({
      next: (res: string) => {
        this.mensagem = res; // agora exibe corretamente a mensagem da API
        console.log(this.mensagem);
      },
      error: (err) => {
        this.erro = err.error || 'Ocorreu um erro ao tentar enviar o e-mail.';
      }
    });

    console.log("this.mensagem", this.mensagem);
    console.log("this.erro", this.erro);
  }

  voltarLogin() {
    this.router.navigate(['/login']);
  }
}
