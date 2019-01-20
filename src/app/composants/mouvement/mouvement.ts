export interface Mouvement {
  id: number;
  langcode: string;
  user_id: number;
  id_user: number;
  id_saison: number;
  id_lot: number;
  numero_lot: string;
  saison: string;
  id_annee: number;
  annee: string;
  id_emplacement: number;
  emplacement: string;
  id_variete: number;
  variete: string;
  id_type_mouvement: number;
  id_entree: number;
  date_mouvement: Date;
  quantite_entree: number;
  quantite_sortie: number;
  valeur_mouvement: number;
  piece: string;
  information: string;
  genre_mouvement: string;
  status: number;
}
