import {Component, EventEmitter, OnInit, ElementRef, Output, AfterViewInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import { AppConfig } from '../../app.config';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {filter} from 'rxjs/operators';
declare let jQuery: any;
declare const window: any;

@Component({
  selector: 'app-navbar',
  styleUrls: [ './navbar.style.scss' ],
  templateUrl: './navbar.template.html'
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @Output() toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
  $el: any;
  config: any;
  router: Router;
  modalRef: BsModalRef;
  disabled: boolean;
  addDataspaceModel = {
    label: '',
    domain: ''
  };
  isMainPage;

  constructor(el: ElementRef, config: AppConfig, router: Router,
              private modalService: BsModalService,
              private activatedRoute: ActivatedRoute) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
    this.router = router;

    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((x: NavigationEnd) => {
        this.isMainPage = !!x.url.includes('home');
        setTimeout(() => this.initSlider(), 10);
      });
  }

  toggleSidebar(state): void {
    this.toggleSidebarEvent.emit(state);
  }

  onDashboardSearch(f): void {
    this.router.navigate(['/app', 'extra', 'search'], { queryParams: { search: f.value.search } });
  }

  ngAfterViewInit(): void {
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

  confirmModal(domain, label, secure, sponger): void {
    const silent = true;
    window.addDataspace(domain, label, secure, sponger, silent);
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

  ngOnInit(): void {
  }
}
