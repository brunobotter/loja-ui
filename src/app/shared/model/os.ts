import { Cliente } from './cliente';
import { Funcionario } from './funcionario';
import { Descricao } from './descricao';

export class Os {

    id: number;
    comentarios: Array<Descricao>;
    dataEntrada: Date;
    dataSaida: Date;
    preco: number;
    cliente: Cliente;
    funcionario: Funcionario;
    status: string;
}
