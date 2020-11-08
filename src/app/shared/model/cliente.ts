export class Cliente {

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

export interface Page{
number: number;
size: number;
totalElements: number;
totalPages: number;
}
