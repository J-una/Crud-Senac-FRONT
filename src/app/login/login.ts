import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../services/autenticacao.service';
import { AuthService } from '../AuthService';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NgxMaskDirective],
   providers: [provideNgxMask()],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  formLogin: FormGroup;
  erroLogin = '';

  constructor(
    private fb: FormBuilder,
    private autenticacaoService: AutenticacaoService,
    private router: Router,
    private authService: AuthService
  ) {
    this.formLogin = this.fb.group({
      cpf: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

    login() {
      if (this.formLogin.invalid) return;

      const { cpf, senha } = this.formLogin.value;

      this.autenticacaoService.autenticar(cpf, senha).subscribe({
      next: (res) => {
        if (res) {
          this.authService.login(res); // notifica serviço de autenticação
          this.router.navigate(['/cliente']);
        }
      },
      error: (err) => {
        this.erroLogin = err.error || 'CPF ou senha incorretos.';
      }
    });
  }

  irParaRecuperarSenha() {
    this.router.navigate(['/recuperar-senha']);
  }

}

