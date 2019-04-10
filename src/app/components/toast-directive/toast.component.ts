import {Component, ElementRef, OnInit} from '@angular/core';
import {ToastService} from './toast.service';

@Component({
  selector: 'dev-toast',
  templateUrl: './toast.template.html'
})
export class ToastComponent implements OnInit {
  $el: any;
  body: any;
  title: any;
  constructor(el: ElementRef, private toastService: ToastService) {
    this.$el = el.nativeElement;
  }

  ngOnInit(): void {
    this.toastService.getToastObserver().subscribe((data: any) => {
      this.title = data.title;
      this.body = data.body;
      this.$el.classList.add('showing');
      setTimeout(() => this.$el.classList.remove('showing'), 4000);
    });
  }

  deleteToast() {
    this.$el.classList.remove('showing');
  }

}
