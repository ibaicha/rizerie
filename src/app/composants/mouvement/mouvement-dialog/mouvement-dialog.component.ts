import {Component, OnInit, Inject, Injectable} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MouvementService } from '../../../services/mouvement.service';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { ShareService } from '../../../services/share.service';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { Subscription } from 'rxjs/Subscription';
import { Mouvement } from '../mouvement';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VERSION } from '@angular/material';

import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as moment from 'moment';
import { isDate } from '@angular/common/src/i18n/format_date';

export interface TypeMouvement {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-mouvement-dialog',
  templateUrl: './mouvement-dialog.component.html',
  styleUrls: ['./mouvement-dialog.component.css']
})
export class MouvementDialogComponent implements OnInit {

  version = VERSION;
  dateForm: FormGroup;

  mesLots = [];
  annees = [];
  saisons = [];
  entrees = [];
  sorties = [];
  varietes = [];
  mouvements = [];
  typeMouvement = '';
  disableSelect = true;

  isDisabled = true;
  isLotVisible = false;
  isNumeroLotVisible = true;
  isSearchLotDisabled = true;
  isValidTypeEntre = 0;
  isValidVariete = 0;
  isValidDate = 0;
  isValidQuantite = 0;

  favoriteLot: string;
  lots: string[] = ['Nouveau', 'Existant'];

  op_agence = [];
  _variete = [];
  filteredOptions: Observable<string[]>;
 //  opCtrl: FormControl = new FormControl();
  lotCtrl: FormControl = new FormControl();
  selected = null;
  filteredFirmwareLot: Observable<any>;
  subcribtion: Subscription;

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());

  type_mouvements: TypeMouvement[] = [
    {value: 'entree', viewValue: 'Entrée stock'},
    {value: 'sortie', viewValue: 'Sortie stock'}
  ];
// setting this is the key to initial select.
selectedValue =  'entree';


  constructor(
    private adapter: DateAdapter<any>,
    private fb: FormBuilder,

    public  mouvementService: MouvementService,
    private loginService: LoginService,
    private shareService: ShareService,
    private dialogRef: MatDialogRef<MouvementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {

    this.favoriteLot = 'Nouveau';

    this.mouvementService.newMouvement.date_entree = new Date();
    this.mouvementService.newMouvement.id_annee = this.loginService.Campagne.id_annee_cours;
    this.mouvementService.newMouvement.id_saison = this.loginService.Campagne.id_saison_cours;
    this.mouvementService.newMouvement.quantite_entree = '';
    this.mouvementService.newMouvement.quantite_sortie = '';
    this.mouvementService.newMouvement.id_type_entree = null;
    this.mouvementService.newMouvement.id_variete = null;

    if (this.mouvementService.type_mouvement === 'entree') {
      this.typeMouvement = 'Mode Entrée';
      // this.mouvements = this.entrees;
      this.mouvementService.getAlltypeentrees().subscribe(data => {
        this.mouvements = data.filter(x => x.id_famille_emplacement.toString() ===
        this.loginService.UserConnexion.idFamilleEmplacemnt.toString());
        // console.log( 'Data entree ', this.mouvements);
      }
      );
    }

    if (this.mouvementService.type_mouvement === 'sortie') {
      this.typeMouvement = 'Mode Sortie';
      // this.mouvements = this.sorties;
      this.mouvementService.getAlltypesorties().subscribe(data => {
        this.mouvements = data.filter(x => x.id_famille_emplacement.toString() ===
        this.loginService.UserConnexion.idFamilleEmplacemnt.toString());
        // console.log( 'Data sortie ', this.mouvements);
      }
      );
    }

    this.loginService.getAllVarietes().subscribe(data => {
      this.varietes = data.filter(x => x.id_produit.toString() ===
      this.loginService.UserConnexion.idProduit.toString());
      // console.log( 'Data variete ', this.varietes);
    }
    );
    this.shareService.getAnnees().subscribe(res => {
      this.annees = res;
      // console.log( 'Data annees ', this.annees);
    });
    this.shareService.getSaisons().subscribe(res => {
      this.saisons = res;
      // console.log( 'Data saisons ', this.saisons);
    });

    if (this.mouvementService.editMouvementForm === true) {
      this.isValidQuantite = 1;
      this.isValidVariete = 1;
      this.isValidTypeEntre = 1;
      this.isDisabled = false;
    }

    this.subcribtion = this.lotCtrl.valueChanges.subscribe(value => this.selected = value);
    this.filteredFirmwareLot = this.lotCtrl.valueChanges.pipe(
      startWith(''),
      map(val => this.filterFirmwareLot(val))
    );


    this.loginService.getAllLots().subscribe( data => {
        this.mesLots = data;
        console.log( 'Data mes lots', this.mesLots);
          }
        );


        this.loginService.getAllLots()
        .subscribe(data => {
          this.mesLots = data.filter(x => x.id_emplacement.toString() ===  this.loginService.UserConnexion.idEmplacemnt)
          .filter(x => x.id_entrepot.toString() === this.loginService.UserConnexion.idEntrepot.toString());
        }
        );

  }


  filterFirmwareLot(value: any): any[] {
    return this.mesLots.filter(firmwareLot => {
      const name = value.numero_lot ? value.numero_lot : value;
      // console.log( 'Dataxxxxxxxxxxxxxxxxxx ', firmwareLot.nom);
      return firmwareLot.numero_lot.toLowerCase().indexOf(name.toLowerCase()) === 0;
    });
  }

  displayFirmwareLot(firmwareLot?: any) {
    return firmwareLot ? firmwareLot.numero_lot : undefined;
  }

  onChangeModeMouvement(deviceValue) {
    // console.log( 'Mode mouvement', deviceValue);

    if (deviceValue === 'entree') {
      this.typeMouvement = 'Mode Entrée';
      this.mouvements = this.entrees;
     this.disableSelect = false;
    }
    if (deviceValue === 'sortie') {
      this.typeMouvement = 'Mode Sortie';
      this.mouvements = this.sorties;
      this.disableSelect = false;
    }
  }

  onChangeLot(event) {
    console.log(event.checked);
    this.isLotVisible = false;
    if (event.checked) {
      this.isLotVisible = true;
    }
  }


  onChangeSearchLotxxxx(event) {
    console.log('mon lot', event);
  }

  onChangeSearchLot(event) {
    console.log('mon lot', event);
  }

  onModeLot(event) {
    console.log(event['value']);
    // this.isLotVisible = false;
    if (event['value'] === 'Nouveau') {
      this.isNumeroLotVisible = true;
      this.isSearchLotDisabled = true;

    }
    if (event['value'] === 'Existant') {
      this.isNumeroLotVisible = false;
      this.isSearchLotDisabled = false;

    }
  }


  close() {
      this.dialogRef.close();
    }

    isMoment(MyMomment) {
      const newDate = moment(MyMomment).format('YYYY-MM-DD');


      return newDate;
    }
    saveMouvement() {
      if (this.mouvementService.isNewForm) {
        this.mouvementService.newMouvement.langcode = 'fr';
        this.mouvementService.newMouvement.user_id = this.loginService.UserConnexion.idUser;
        this.mouvementService.newMouvement.id_user = this.loginService.UserConnexion.idUser;
        this.mouvementService.newMouvement.id_annee = this.mouvementService.newMouvement.id_annee;
        this.mouvementService.newMouvement.id_saison = this.mouvementService.newMouvement.id_saison;
        this.mouvementService.newMouvement.id_emplacement = this.loginService.UserConnexion.idEmplacemnt;
        this.mouvementService.newMouvement.id_type_mouvement = this.mouvementService.newMouvement.id_type_entree;
        this.mouvementService.newMouvement.id_variete = this.mouvementService.newMouvement.id_variete;
        this.mouvementService.newMouvement.numero_lot = this.mouvementService.newMouvement.numero_lot;
        this.mouvementService.newMouvement.date_mouvement = this.isMoment(this.mouvementService.newMouvement.date_entree);
        this.mouvementService.newMouvement.valeur_mouvement = 0;
        this.mouvementService.newMouvement.piece = this.mouvementService.newMouvement.piece;
        this.mouvementService.newMouvement.information = this.mouvementService.newMouvement.information;
        this.mouvementService.newMouvement.status = '1';

        // console.log( 'Messag Num Lot:', this.mouvementService.newMouvement.numero_lot);

        if (this.mouvementService.type_mouvement === 'entree') {
          this.mouvementService.newMouvement.quantite_entree = this.mouvementService.newMouvement.quantite_entree;
          this.mouvementService.newMouvement.genre_mouvement = 'entree';
        }
        if (this.mouvementService.type_mouvement === 'sortie') {
          // console.log( 'Message', 'SORTIE');
          this.mouvementService.newMouvement.quantite_sortie = this.mouvementService.newMouvement.quantite_entree;
          this.mouvementService.newMouvement.genre_mouvement = 'sortie';
         // this.mouvementService.newMouvement.id_entree = null;
        }
        this.mouvementService.postEntree(this.mouvementService.newMouvement).subscribe();
      }
      this.mouvementService.mouvementForm = false;
      this.close();
    }

    updateMouvement() {

        this.mouvementService.editedMouvement.id_annee = this.mouvementService.editedMouvement.id_annee;
        this.mouvementService.editedMouvement.id_saison = this.mouvementService.editedMouvement.id_saison;
        this.mouvementService.editedMouvement.id_type_mouvement = this.mouvementService.editedMouvement.id_type_mouvement;
        this.mouvementService.editedMouvement.id_variete = this.mouvementService.editedMouvement.id_variete;
        this.mouvementService.editedMouvement.date_mouvement = this.isMoment(this.mouvementService.editedMouvement.date_mouvement);
        this.mouvementService.editedMouvement.valeur_mouvement = 0;
        this.mouvementService.editedMouvement.piece = this.mouvementService.editedMouvement.piece;
        this.mouvementService.editedMouvement.information = this.mouvementService.editedMouvement.information;

        // console.log( 'Message', this.mouvementService.newMouvement);

        if (this.mouvementService.type_mouvement === 'entree') {
          this.mouvementService.editedMouvement.quantite_entree = this.mouvementService.editedMouvement.quantite_entree;
          this.mouvementService.editedMouvement.genre_mouvement = 'entree';
        }
        if (this.mouvementService.type_mouvement === 'sortie') {
          // console.log( 'Message', 'SORTIE');
          this.mouvementService.editedMouvement.quantite_sortie = this.mouvementService.editedMouvement.quantite_sortie;
          this.mouvementService.editedMouvement.genre_mouvement = 'sortie';
          this.mouvementService.editedMouvement.id_entree = null;
        }
      this.mouvementService.putMouvement(this.mouvementService.editedMouvement).subscribe();
      this.mouvementService.editMouvementForm = false;
      this.mouvementService.editedMouvement = {};

      this.close();
    }



    ValiderQuantiteEntree() {

      this.isValidQuantite = 0;
      this.isDisabled = true;
       if (this.mouvementService.newMouvement.quantite_entree || this.mouvementService.editedMouvement.quantite_entree) {
         this.isValidQuantite = 1;
         if ( (this.isValidQuantite  + this.isValidTypeEntre + this.isValidVariete) > 2) {
           this.isDisabled = false;
       }
      }
      console.log( 'Compter', this.isValidQuantite  + this.isValidTypeEntre + this.isValidVariete);
    }

    ValiderTypeMouvement() {

      console.log( 'type MOUVEMENT', this.mouvementService.newMouvement.id_type_entree);

      this.isValidTypeEntre = 0;
      this.isDisabled = true;
       if (this.mouvementService.newMouvement.id_type_entree > 0 || this.mouvementService.editedMouvement.id_type_entree > 0) {
         this.isValidTypeEntre = 1;
         if ( (this.isValidQuantite + this.isValidDate + this.isValidTypeEntre + this.isValidVariete) > 2) {
           this.isDisabled = false;
       }
      }

    }

    ValiderVarieteMouvement() {

      console.log( 'Variete', this.mouvementService.newMouvement.id_variete);

      this.isValidVariete = 0;
      this.isDisabled = true;
       if (this.mouvementService.newMouvement.id_variete > 0 || this.mouvementService.editedMouvement.id_variete > 0) {
         this.isValidVariete = 1;
         if ( (this.isValidQuantite + this.isValidDate + this.isValidTypeEntre + this.isValidVariete) > 2) {
           this.isDisabled = false;
       }
      }

    }



    isValidDater(dateStr) {

      // Checks for the following valid date formats:
      // MM/DD/YYYY
      // Also separates date into month, day, and year variables
      const datePat = /^(\d{2,2})(\/)(\d{2,2})\2(\d{4}|\d{4})$/;

      const matchArray = dateStr.match(datePat); // is the format ok?
      if (matchArray == null) {
       return false;
      }
}
}
