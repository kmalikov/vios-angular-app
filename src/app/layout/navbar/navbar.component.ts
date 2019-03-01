import { Component, EventEmitter, OnInit, ElementRef, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../app.config';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
declare let jQuery: any;
declare const window: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.template.html'
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
  @Output() toggleChatEvent: EventEmitter<any> = new EventEmitter();
  $el: any;
  config: any;
  router: Router;
  modalRef: BsModalRef;
  disabled: boolean;
  addDataspaceModel = {
    label: '',
    domain: ''
  };

  constructor(el: ElementRef, config: AppConfig, router: Router,
              private modalService: BsModalService) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
    this.router = router;
  }

  toggleSidebar(state): void {
    this.toggleSidebarEvent.emit(state);
  }

  toggleChat(): void {
    this.toggleChatEvent.emit(null);
  }

  onDashboardSearch(f): void {
    this.router.navigate(['/app', 'extra', 'search'], { queryParams: { search: f.value.search } });
  }

  ngOnInit(): void {
    setTimeout(() => {
      const $chatNotification = jQuery('#chat-notification');
      $chatNotification.removeClass('hide').addClass('animated fadeIn')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
          $chatNotification.removeClass('animated fadeIn');
          setTimeout(() => {
            $chatNotification.addClass('animated fadeOut')
              .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd' +
                ' oanimationend animationend', () => {
                $chatNotification.addClass('hide');
              });
          }, 8000);
        });
      $chatNotification.siblings('#toggle-chat')
        .append('<i class="chat-notification-sing animated bounceIn"></i>');
    }, 4000);

    this.$el.find('.input-group-addon + .form-control').on('blur focus', function(e): void {
      jQuery(this).parents('.input-group')
        [e.type === 'focus' ? 'addClass' : 'removeClass']('focus');
    });

    this.initSlider();

  }

  initSlider() {
    const toSeconds = millis => {
      const milliseconds = millis % 1000;
      const seconds = Math.floor((millis / 1000) % 60);
      return seconds + '.' + milliseconds.toString().substring(0, 2) + ' secs';
    };
    jQuery('.js-slider').slider({
      tooltip_position: 'bottom',
      formatter: function(value) {
        return 'Allow: ' + toSeconds(value);
      }
    });
  }

  addDataspace(template) {
    this.modalRef = this.modalService.show(template);
  }

  confirmModal(domain, label, secure): void {
    window.addDataspace(domain, label, secure);
    this.addDataspaceModel = {
      label: '',
      domain: ''
    };
    this.modalRef.hide();

  }

  declineModal(addDataspaceForm): void {
    this.modalRef.hide();
  }

  checkDataspaceForm(domain, label) {
    this.disabled = !(domain.length > 0 && label.length > 0);
  }
}
