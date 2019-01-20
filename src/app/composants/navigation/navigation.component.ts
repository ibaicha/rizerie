import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public nav: NavigationService, private loginService: LoginService) { }

  ngOnInit() {
  }

}
