import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ToastService {
  toastObserver = new Subject();
  constructor() {
  }

  getToastObserver() {
    return this.toastObserver.asObservable();
  }

  showToast(title: string, body: string) {
    this.toastObserver.next({title: title, body: body});
  }
}
