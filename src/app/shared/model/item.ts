import { Venda } from './venda';
import { Produto } from './produto';
export class Item {

    id: number;
    produto: Produto;
    venda: Venda;
    quantidade: number;
    valor: number;
}
