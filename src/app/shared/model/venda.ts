import { Funcionario } from './funcionario';
import { Cliente } from './cliente';
import { Item } from './item';
export class Venda {

    id: number;
    dataVenda: Date;
    cliente: Cliente;
    funcionario: Funcionario;
    desconto: number;
    valorTotal: number;
    statusVenda: string;
    listaItem: Array<Item>;
}
