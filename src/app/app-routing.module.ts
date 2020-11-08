import { FinalizarVendaComponent } from './principal/venda/finalizar-venda/finalizar-venda.component';
import { CarrinhoComponent } from './principal/venda/carrinho/carrinho.component';
import { OsListComponent } from './principal/os/os-list/os-list.component';
import { VendaListComponent } from './principal/venda/venda-list/venda-list.component';
import { ProdutoListComponent } from './principal/produto/produto-list/produto-list.component';
import { FuncionarioListComponent } from './principal/funcionario/funcionario-list/funcionario-list.component';
import { ClienteListComponent } from './principal/cliente/cliente-list/cliente-list.component';
import { VendaComponent } from './principal/venda/venda.component';
import { OsComponent } from './principal/os/os.component';
import { FuncionarioComponent } from './principal/funcionario/funcionario.component';
import { ClienteComponent } from './principal/cliente/cliente.component';
import { ProdutoComponent } from './principal/produto/produto.component';
import { PrincipalComponent } from './principal/principal.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OsModalComponent } from './principal/os/os-modal/os-modal.component';

const routes: Routes = [
  {path : '', component: PrincipalComponent},
  {path : 'produto', component: ProdutoComponent},
  {path : 'produto-lista', component: ProdutoListComponent},
  {path : 'cliente', component: ClienteComponent},
  {path : 'cliente-lista', component: ClienteListComponent},
  {path : 'funcionario', component: FuncionarioComponent},
  {path : 'funcionario-lista', component: FuncionarioListComponent},
  {path : 'os', component: OsComponent},
  {path : 'os-lista', component: OsListComponent},
  {path : 'os-lista/:id', component: OsModalComponent},
  {path : 'venda', component: VendaComponent},
  {path : 'venda/:id/carrinho', component: CarrinhoComponent},
  {path : 'venda/:id/finalizar-venda', component: FinalizarVendaComponent},
  {path : 'venda-lista', component: VendaListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
