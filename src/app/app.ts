import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { LoginComponent } from './login/login';
import { LoadingComponent } from './loading/loading';


@Component({
  selector: 'app-root',
  imports: [ Inicio, LoadingComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('crudSenac');
}
