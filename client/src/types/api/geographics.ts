export interface Geographic {
  id: string;
  name: string;
}

export interface SubGeographic {
  id: string;
  name: string;
  geographic: Geographic['id'];
  code: string;
  abbreviation: string;
  parent?: SubGeographic;
}
