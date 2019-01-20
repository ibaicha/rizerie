import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pwa7-example';
  showLoader: boolean;
  constructor(private sWupdate: SwUpdate, private loaderService: LoaderService) {}
  ngOnInit() {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
  });
    if (this.sWupdate.isEnabled) {
      this.sWupdate.available.subscribe(() => {
          if (confirm('Une nouvelle version est disponible. Charger la version?')) {
              window.location.reload();
          }
      });
  }
}
}
