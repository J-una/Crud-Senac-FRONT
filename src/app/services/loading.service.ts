import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private requestsAtivas = 0;

  mostrar() {
    this.requestsAtivas++;
    this.loadingSubject.next(true);
  }

  esconder() {
    this.requestsAtivas--;
    if (this.requestsAtivas <= 0) {
      this.loadingSubject.next(false);
      this.requestsAtivas = 0;
    }
  }
}