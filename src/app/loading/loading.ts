import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loadingService.loading$ | async" class="loading-overlay">
      <div class="spinner"></div>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    .spinner {
      width: 50px;
      height: 50px;
      border: 6px solid #fff;
      border-top: 6px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
}
