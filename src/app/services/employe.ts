export interface Employe {
  $key: string;
  nom: string;
  prenom: string;
  cni: string;
  emission: string;
  salaire: Number;
}

export interface Bus {
  $key: string;
  ligne: Number;
  trajet: string;
  prix: Number;
  condicteur: string;
  serviant: string;
}
