import { Cliente } from './cliente';
export interface SortQuery {
  property: string,
  direction: string
}

export interface PageQuery {
  pageNumber: number,
  pageSize: number
}

export interface Pagina {
  _embedded: Array<clienteVoes>;
  size: number;
  totalElements: number;
  number: number;
  totalPages: number;
};

export class clienteVoes{
  id: number;
  nome: string;
  telefone: string;
  email: string;
  logradouro: string;
  cep: string;
  cidade: string;
  estado: string;
  numero: string;
  complemento: string;
  cpf: string;
}

export interface QueryBuilder {
  pageQuery: PageQuery;
  sortQuery: SortQuery;
  aditionalQuery: Map<string, string>;
  buildQueryMap(): Map<string, string>;
  buildQueryString(): string;
  buildPageQueryMap(): Map<string, string>;
  buildSortQueryMap(): Map<string, string>;
}

export class PageRequest implements QueryBuilder {

  constructor(public pageQuery: PageQuery, public sortQuery: SortQuery, public aditionalQuery: Map<string, string>) { }

  buildQueryMap(): Map<string, string> {

      let buildQueryMap = new Map<string, string>([...this.buildPageQueryMap(),...this.buildSortQueryMap()]);

      if (this.aditionalQuery) {
          buildQueryMap = new Map<string, string>([...buildQueryMap,...this.aditionalQuery])
      }

      return buildQueryMap;
  }

  buildQueryString(): string {

      return Array.from(this.buildQueryMap()).map(itemArray => `${itemArray[0]}=${itemArray[1]}`).join("&");

  }

  buildPageQueryMap(): Map<string, string> {

      let buildPageQueryMap = new Map<string, string>();

      buildPageQueryMap.set("_page", `${this.pageQuery.pageNumber + 1}`);
      buildPageQueryMap.set("_limit", `${this.pageQuery.pageSize}`);

      return buildPageQueryMap;

  }

  buildSortQueryMap(): Map<string, string> {

      let buildPageQueryMap = new Map<string, string>();

      buildPageQueryMap.set("_sort", `${this.sortQuery.property}`);
      buildPageQueryMap.set("_order", `${this.sortQuery.direction}`);

      return buildPageQueryMap;

  }

}

export class Page<T> {

  constructor(public _embedded: T[], public totalElements: number){}

  static fromResponse<T>(response:any){
      return new Page<T>(response.body, parseInt(response.headers.get("X-Total-Count")));
  }
  
}