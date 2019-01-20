import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs/';
import {ShareService } from './share.service';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class LoginService {
  private isUserLoggedIn;


  public UserConnexion = {
    annee_cours : 0,
    saison_cours : 0,
    idUser: 0,
    username: '',
    role: '',
    idEmplacemnt: 0,
    Emplacement: '',
    idFamilleEmplacemnt: 0,
    FamilleEmplacement: '',
    idEntrepot: 0,
    Entrepot: '',
    idTypeProduit: 0,
    TypeProduit: '',
    idProduit: 0,
    Produit: '',
    idAgence: 0,
    Agence: '',
    idDepartement: 0,
    Departement: '',
    idCreancier: 0,
    Creancier: '',

    typeConnexion: '',
    isGestionnaire: false,
    isCoordonnateur: false,
    isCreancier: false,
    isConsultant: false,
    isMagasinier: false,
    isUsinier: false,

 };

 public Campagne = {
  id_annee_cours : 0,
  id_saison_cours : 0,
  annee_cours : '',
  saison_cours : '',
};

public CampagneCours = {
  id_annee_cours : 0,
  id_saison_cours : 0,
  annee_cours : '',
  saison_cours : '',
};

  constructor(private appService: AppService, private shareService: ShareService, private http: HttpClient) {
    this.isUserLoggedIn = false;
   }

  getAllUser(): Observable<any> {
    return this.http.get(this.shareService.serviceURL + 'myrest_api/getallutilisateurs.json',
    {responseType: 'json'});
  }
  getUser(username, password): Observable<any> {
    return this.http.get(this.shareService.serviceURL + '/myrest_api/getutilisateur.json/' + username + '/' + password,
    {responseType: 'json'});
  }
  getUserIDEmplacement(id): Observable<any> {
    return this.http.get(this.shareService.serviceURL + '/myrest_api/getutilisateurIDEmplacement.json/' + id, {responseType: 'json'});
  }
// ------------------------------------------------------------------------------------------------------------///
  getUserID(id): Observable<any> {
    return this.http.get(this.shareService.serviceURL + '/myrest_api/getutilisateurID.json/' + id, {responseType: 'json'});
  }

  getUserIDAgence(id): Observable<any> {
    return this.http.get(this.shareService.serviceURL + '/myrest_api/getutilisateurIDAgence.json/' + id, {responseType: 'json'});
  }
  getUserIDEntrepot(id): Observable<any> {
    return this.http.get(this.shareService.serviceURL + '/myrest_api/getutilisateurIDEntrepot.json/' + id, {responseType: 'json'});
  }
  getAllVarietes(): Observable<any> {
    return this.http.get(this.shareService.serviceURL + 'myrest_api/getallvarietes.json',
    {responseType: 'json'});
  }
  getAllLots(): Observable<any> {
    return this.http.get(this.shareService.serviceURL + 'myrest_api/getalllots.json',
    {responseType: 'json'});
  }
  setUserLoggedIn() {
    this.isUserLoggedIn = true;

  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }
  getUserConnexion() {
    return this.UserConnexion;
  }
}
