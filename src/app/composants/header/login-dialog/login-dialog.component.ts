import {Component, OnInit, Inject, Injectable} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { Observable } from 'rxjs/';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {ShareService } from '../../../services/share.service';
import {LoginService } from '../../../services/login.service';
import { Login } from '../login-dialog/login';
import { NavigationService } from '../../../services/navigation.service';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  logger = [];
  newLogin: any = {};
  UserAgence = [];
  Entrepots = [];

  form: FormGroup;
     // description: string;

    constructor(
        private router: Router, private loginService: LoginService, private shareService: ShareService, public nav: NavigationService,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<LoginDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() {
        this.form = this.fb.group({
           // description: [this.description, []],
        });

            this.shareService.getCampagne().subscribe(res => {

                  this.loginService.Campagne.id_annee_cours = res[0].id_annee;
                  this.loginService.Campagne.annee_cours = res[0].annee;
                  this.loginService.Campagne.id_saison_cours = res[0].id_saison;
                  this.loginService.Campagne.saison_cours = res[0].saison;

                  this.loginService.CampagneCours.id_annee_cours = res[0].id_annee;
                  this.loginService.CampagneCours.annee_cours = res[0].annee;
                  this.loginService.CampagneCours.id_saison_cours = res[0].id_saison;
                  this.loginService.CampagneCours.saison_cours = res[0].saison;

                  console.log( 'Data open', res);

            } );

           // console.log( 'Data credits', this.loginService.CampagneCours);
          }

save(login: Login) {
  this.loginService.getUser(login['username'], login['password']).subscribe(res => {
  this.logger = res;

  if (this.logger.length !== 0) {
    if (this.logger[0].status === '1') {
    this.loginService.setUserLoggedIn();
    this.loginService.UserConnexion.idUser = this.logger[0].id;
    this.loginService.UserConnexion.username = this.logger[0].name;
    this.loginService.UserConnexion.role = this.logger[0].role;

    if (this.loginService.UserConnexion.role === 'consultant') {

      this.loginService.UserConnexion.typeConnexion = 'Consultant';
      this.loginService.UserConnexion.isConsultant = true;
    }
    if (this.loginService.UserConnexion.role === 'usine') {

      this.loginService.UserConnexion.typeConnexion = 'Usine';
      this.loginService.UserConnexion.isUsinier = true;
    }
    if (this.loginService.UserConnexion.role === 'magasin') {

      this.loginService.UserConnexion.typeConnexion = 'Magasin';
      this.loginService.UserConnexion.isMagasinier = true;
    }


// -------------------------------- SI MAGASINIER -------------------------------------------//
this.loginService.getUserIDEmplacement(this.loginService.UserConnexion.idUser).subscribe( restUserIDEntrepot => {
  this.UserAgence = restUserIDEntrepot;
    if (this.UserAgence.length !== 0) {
      this.loginService.UserConnexion.idEntrepot = this.UserAgence[0].my_id_entrepot;
      this.loginService.UserConnexion.Entrepot = this.UserAgence[0].my_entrepot;
      this.loginService.UserConnexion.idEmplacemnt = this.UserAgence[0].my_id_emplacement;
        this.loginService.UserConnexion.Emplacement = this.UserAgence[0].my_emplacement;
        this.loginService.UserConnexion.idFamilleEmplacemnt = this.UserAgence[0].my_id_famille_emplacement;
        this.loginService.UserConnexion.FamilleEmplacement = this.UserAgence[0].my_famille_emplacement;
        this.loginService.UserConnexion.idDepartement = this.UserAgence[0].my_id_departement;
        this.loginService.UserConnexion.Departement = this.UserAgence[0].my_departement;
        this.loginService.UserConnexion.idTypeProduit = this.UserAgence[0].my_id_type_produit;
        this.loginService.UserConnexion.TypeProduit = this.UserAgence[0].my_type_produit;
        this.loginService.UserConnexion.idProduit = this.UserAgence[0].my_id_produit;
        this.loginService.UserConnexion.Produit = this.UserAgence[0].my_produit;
      this.loginService.UserConnexion.typeConnexion = 'Responsable Stock';
      this.loginService.UserConnexion.isMagasinier = true;
      console.log( 'Data open', this.loginService.UserConnexion);
      this.router.navigate(['mouvement']);

    }
  });


  }

  this.nav.show();
  this.dialogRef.close(this.form.value);
  }
  if (this.logger.length === 0) {

    this.nav.hide();
    alert('Revoir connexion');
    console.log( 'ERREUR ----------------');
  }

}, err => {
    console.log(err);
  });

       // this.dialogRef.close(this.form.value);
    }

    close() {
      // console.log( 'Data fermer', this.loginService.CampagneCours);
        this.dialogRef.close();
      }

}
