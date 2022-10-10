export interface Geographic {
  id: string;
  name: string;
}

export interface SubGeographic {
  id: string;
  name: string;
  geographic: Geographic['id'];
  code: string;
}
export interface GeographicsResponseData {
  data: Geographic[];
}

export interface SubGeographicsResponseData {
  data: SubGeographic[];
}
