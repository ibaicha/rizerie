import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Mouvement } from '../composants/mouvement/mouvement';
import {ShareService } from './share.service';
import {LoginService } from './login.service';

@Injectable()
export class MouvementService {

  MouvementDialigTitre = '';
  numairaire = false;
  type_mouvement = '';
  mode_entree = '';
  mouvementForm = false;
  editMouvementForm = false;
  deleteMouvementForm = false;
  isNewForm: boolean;
  newMouvement: any = {};
  editedMouvement: any = {};
  deletedMouvement: any = {};
  entrepot_remboursement_numeraire = '';

  constructor(private http: HttpClient, private shareService: ShareService, private loginService: LoginService) { }

  getMouvementsIDuserIDemplacement(user, emplacement): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(this.shareService.serviceURL + 'myrest_api/getmouvementIdUserIdEmplacement.json/'
    + user + '/' + emplacement, {responseType: 'json'});
  }

  getEntreesIDuserIDemplacement(user, emplacement): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(this.shareService.serviceURL + 'myrest_api/getentreeIdUserIdEmplacement.json/'
    + user + '/' + emplacement, {responseType: 'json'});
  }

    getSumReglementsIDEmplacement(annee, saison, emplacement, reglement): Observable<any> {
    return this.http.get(this.shareService.serviceURL + 'myrest_api/getSumremboursementIdAnneeIdSaisonIdEmplacement.json/'
    + annee + '/' + saison + '/' + emplacement + '/' + reglement, {responseType: 'json'});
  }


  sumEntrepotReglement(entrepot, reglement) {
    let ValeurremboursementT = '';
   this.shareService.getSumReglementsIDEntrepot(
     this.loginService.Campagne.id_annee_cours, this.loginService.Campagne.id_saison_cours, entrepot, reglement)
     .subscribe( data => {
      let Valeurremboursement = 0;
        Valeurremboursement = Valeurremboursement + parseFloat(data);
       ValeurremboursementT = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'XOF' }).format(Valeurremboursement);
     });
  }

  getAlltypeentrees(): Observable<any> {
    return this.http.get(this.shareService.serviceURL + 'myrest_api/getalltypeentrees.json',
    {responseType: 'json'});
  }
  getAlltypesorties(): Observable<any> {
    return this.http.get(this.shareService.serviceURL + 'myrest_api/getalltypesorties.json',
    {responseType: 'json'});
  }
  postEntree(food) {
    return this.http.post(this.shareService.serviceURL + 'myrest_api/postentree.json', food);
  }
  putMouvement(food) {
    return this.http.put(this.shareService.serviceURL + 'myrest_api/putmouvement.json', food);
  }
}
