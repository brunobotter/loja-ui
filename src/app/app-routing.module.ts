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
import { VendaDiaComponent } from './principal/venda/venda-list/venda-dia/venda-dia.component';
import { OsAbertaComponent } from './principal/os/os-list/os-aberta/os-aberta.component';
import { OsFinalizadasComponent } from './principal/os/os-list/os-finalizadas/os-finalizadas.component';
import { LoginComponent } from './principal/login/login.component';
import { LoginGuard } from './shared/guard/login.guard';
import { LoginService } from './principal/login/login.service';
import { HomeComponent } from './principal/home/home.component';

const routes: Routes = [
  {path : '', component: PrincipalComponent, canActivate: [LoginGuard]},
  {path : 'login', component: LoginComponent},
  {path : 'home', component: PrincipalComponent, canActivate: [LoginGuard]},
  {path : 'produto', component: ProdutoComponent, canActivate: [LoginGuard]},
  {path : 'produto-lista', component: ProdutoListComponent, canActivate: [LoginGuard]},
  {path : 'cliente', component: ClienteComponent, canActivate: [LoginGuard]},
  {path : 'cliente-lista', component: ClienteListComponent, canActivate: [LoginGuard]},
  {path : 'funcionario', component: FuncionarioComponent, canActivate: [LoginGuard]},
  {path : 'funcionario-lista', component: FuncionarioListComponent, canActivate: [LoginGuard]},
  {path : 'os', component: OsComponent, canActivate: [LoginGuard]},
  {path : 'os-lista', component: OsListComponent, canActivate: [LoginGuard]},
  {path : 'os-lista/:id', component: OsModalComponent, canActivate: [LoginGuard]},
  {path : 'os-aberta', component: OsAbertaComponent, canActivate: [LoginGuard]},
  {path : 'os-finalizado', component: OsFinalizadasComponent, canActivate: [LoginGuard]},
  {path : 'venda', component: VendaComponent, canActivate: [LoginGuard]},
  {path : 'venda/:id/carrinho', component: CarrinhoComponent, canActivate: [LoginGuard]},
  {path : 'venda/:id/finalizar-venda', component: FinalizarVendaComponent, canActivate: [LoginGuard]},
  {path : 'venda-lista', component: VendaListComponent, canActivate: [LoginGuard]},
  {path: 'venda-dia', component: VendaDiaComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginService, LoginGuard]
})
export class AppRoutingModule { }
