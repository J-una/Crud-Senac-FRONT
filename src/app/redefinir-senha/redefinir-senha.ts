import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
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
    private router: Router,
    private auth: AutenticacaoService
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') ?? '';
    this.form = this.fb.group({
      novaSenha: ['', Validators.required],
      confirmarSenha: ['', Validators.required]
    }, { validators: this.senhasIguais });
  }

  // Validador customizado
  senhasIguais(control: AbstractControl) {
    const senha = control.get('novaSenha')?.value;
    const confirmar = control.get('confirmarSenha')?.value;
    return senha === confirmar ? null : { senhaDiferente: true };
  }

  redefinir() {
    if (this.form.invalid) return;

    this.auth.redefinirSenha(this.token, this.form.value.novaSenha).subscribe(res => {
      this.mensagem = res; 
      if (this.mensagem === 'Senha redefinida com sucesso!') {
        this.form.reset();
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      }
    });
  }
}
