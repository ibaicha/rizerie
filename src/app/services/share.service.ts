import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable()
export class ShareService {

  constructor(private appService: AppService, private http: HttpClient) { }

  public serviceURL = this.appService.getUrl('');

  getAgences(): Observable<any> {
    return this.http.get(this.serviceURL + 'myrest_api/getallagences.json/', {responseType: 'json'});
  }
  getCampagne(): Observable<any> {
    return this.http.get(this.serviceURL + 'myrest_api/getallcampagnes.json', {responseType: 'json'});
  }

  getAnnees(): Observable<any> {
    return this.http.get(this.serviceURL + 'myrest_api/getallannees.json/', {responseType: 'json'});
  }
  getSaisons(): Observable<any> {
    return this.http.get(this.serviceURL + 'myrest_api/getallsaisons.json', {responseType: 'json'});
  }
  getRemboursementsAgences(annee, saison): Observable<any> {
    return this.http.get(this.serviceURL + 'myrest_api/getallremboursementop/' + annee + '/' + saison, {responseType: 'json'});

  }

  getRemboursementsAgencesPoints(annee, saison, agence): Observable<any> {
    return this.http.get(this.serviceURL + 'myrest_api/getallremboursementopPoint.json/'
    + annee + '/' + saison + '/' + agence, {responseType: 'json'});

  }

  getRemboursementsPoints(annee, saison): Observable<any> {
    return this.http.get(this.serviceURL + 'myrest_api/getallremboursementPoint.json/'
    + annee + '/' + saison , {responseType: 'json'});

  }

  getRemboursementsOPs(annee, saison, point): Observable<any> {
    return this.http.get(this.serviceURL + 'myrest_api/getallremboursementOPs.json/'
    + annee + '/' + saison + '/' + point  , {responseType: 'json'});

  }


  getEntrepots(): Observable<any> {
    return this.http.get(this.serviceURL + 'myrest_api/getallentrepots.json', {responseType: 'json'});
  }

  getEmplacements(): Observable<any> {
    return this.http.get(this.serviceURL + 'myrest_api/getallemplacements.json', {responseType: 'json'});
  }
  getSumReglementsIDEntrepot(annee, saison, entrepot, reglement): Observable<any> {
    return this.http.get(this.serviceURL + 'myrest_api/getSumremboursementIdAnneeIdSaisonIdEntrepot.json/'
    + annee + '/' + saison + '/' + entrepot + '/' + reglement, {responseType: 'json'});
  }
  getalltypemouvements(): Observable<any> {
    return this.http.get(this.serviceURL + 'myrest_api/getalltypemouvements.json', {responseType: 'json'});
  }

}
