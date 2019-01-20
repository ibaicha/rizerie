import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { MouvementService } from '../../services/mouvement.service';
import { LoginService } from '../../services/login.service';
import {ShareService } from '../../services/share.service';
import { DecimalPipe } from '@angular/common';
import { clone } from 'lodash';
import {MatDialog, MatDialogConfig} from '@angular/material';
import { Mouvement } from './mouvement';
import { MouvementDialogComponent } from './mouvement-dialog/mouvement-dialog.component';

@Component({
  selector: 'app-mouvement',
  templateUrl: './mouvement.component.html',
  styleUrls: ['./mouvement.component.css']
})
export class MouvementComponent implements OnInit , AfterViewInit {
  panelOpenState = false;
  dataSource = new MatTableDataSource();
  agences_cncas = [];
  agences_cncas_credit = [];
  agences_sites = [];
  agences_sites_emplacements = [];
  SumCredit = 0;
  SumCreditEntrepot = '';
  SumCreditT = '';
  AgenceCours = '';
  IdAgenceCours = 0;

  annees_campagne = [];
  saisons_campagne = [];
  emplacements_remboursement = [];
  emplacements_all = [];
 //  emplacement_cours = [];
  emplacement_cours_code = 0;
  emplacement_cours_nom = '';
  emplacement_visible = false;
  disabled = false;
  entrepot_remboursement_numeraire = '';
  quantite = 0;


  displayedColumns = ['id', 'date_mouvement', 'quantite_entree', 'quantite_sortie', 'actionsColumn'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isDisplayList = true;


  constructor(
    private mouvementService: MouvementService,
    public loginService: LoginService,
    private dialog: MatDialog
  ) { }

    ngOnInit() {


      this.mouvementService.getMouvementsIDuserIDemplacement(this.loginService.UserConnexion.idUser,
        this.loginService.UserConnexion.idEmplacemnt).subscribe( dataPoints => {
          this.dataSource.data = dataPoints;
          console.log( 'Data dep chose12', this.dataSource);
            }
          );
    }

    ngAfterViewInit() {

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // this.dataSource.filterPredicate = (data: Mouvement, filter: string) => data.op.indexOf(filter) !== -1;
    }


showAddMouvementEntreeForm() {
  this.mouvementService.mouvementForm = true;
  this.mouvementService.editMouvementForm = false;
  this.mouvementService.isNewForm = true;
  this.mouvementService.type_mouvement = 'entree';


  const dialogConfig = new MatDialogConfig();

  this.mouvementService.MouvementDialigTitre = 'Entrée Stock';

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.height = '800px';

    this.dialog.open(MouvementDialogComponent, dialogConfig);
}

showAddMouvementSortieForm() {
  this.mouvementService.mouvementForm = true;
  this.mouvementService.editMouvementForm = false;
  this.mouvementService.isNewForm = true;
  this.mouvementService.type_mouvement = 'sortie';


  const dialogConfig = new MatDialogConfig();

  this.mouvementService.MouvementDialigTitre = 'Sortie Stock';

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '800px';

    this.dialog.open(MouvementDialogComponent, dialogConfig);
}

showEditMouvementForm(mouvement: Mouvement) {
  if (!mouvement) {
    this.mouvementService.mouvementForm = false;
    return;
  }
  this.mouvementService.editMouvementForm = true;
  this.mouvementService.mouvementForm = false;
  this.mouvementService.editedMouvement = clone(mouvement);
  const dialogConfig = new MatDialogConfig();
  console.log( 'mes elements ', mouvement);
  this.mouvementService.MouvementDialigTitre = 'Modification Entree Stock';
  this.mouvementService.type_mouvement = 'entree';
  this.quantite = this.mouvementService.editedMouvement.quantite_entree;
  if (mouvement['quantite_entree'] === null && mouvement['quantite_sortie'] != null) {
    this.mouvementService.MouvementDialigTitre = 'Modification Sortie Stock';
    this.mouvementService.type_mouvement = 'sortie';
    this.quantite = this.mouvementService.editedMouvement.quantite_sortie;
  }
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(MouvementDialogComponent , dialogConfig);
}

}
