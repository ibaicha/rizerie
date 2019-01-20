import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { LoginDialogComponent } from '../header/login-dialog/login-dialog.component';
import { NavigationService } from '../../services/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public loginService: LoginService, private dialog: MatDialog, public nav: NavigationService) { }

  ngOnInit() {
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '250px';

    this.dialog.open(LoginDialogComponent, dialogConfig);
  }

  disconnect() {
    this.nav.hide();
    this.loginService.UserConnexion.idUser = 0;
    this.loginService.UserConnexion.username = '';
    this.loginService.UserConnexion.role = '';
    this.loginService.UserConnexion.idEntrepot = 0;
    this.loginService.UserConnexion.Entrepot = '';
    this.loginService.UserConnexion.idEmplacemnt = 0;
    this.loginService.UserConnexion.Emplacement = '';
    this.loginService.UserConnexion.idAgence = 0;
    this.loginService.UserConnexion.Agence = '';
    this.loginService.UserConnexion.idCreancier = 0;
    this.loginService.UserConnexion.Creancier = '';
    this.loginService.UserConnexion.isGestionnaire = false,
    this.loginService.UserConnexion.isCoordonnateur = false,
    this.loginService.UserConnexion.isCreancier = false,
    this.loginService.UserConnexion.isConsultant = false,
    this.loginService.UserConnexion.isMagasinier = false,
    this.loginService.UserConnexion.typeConnexion = '';
    this.router.navigate(['home']);


  }

}
