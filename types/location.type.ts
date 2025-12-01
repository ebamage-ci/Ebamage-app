export interface ILocation {
  id: number;
  libelle: string;
}
export interface ILocationCity {
  lib_ville: string;
  hashid: string;
}

export interface ILocationTown {
  hashid: string;
  lib_commune: string;
}
