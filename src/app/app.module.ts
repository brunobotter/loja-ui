import { FuncionarioListComponent } from './principal/funcionario/funcionario-list/funcionario-list.component';
import { ClienteListComponent } from './principal/cliente/cliente-list/cliente-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PrincipalComponent } from './principal/principal.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ProdutoComponent } from './principal/produto/produto.component';
import { ClienteComponent } from './principal/cliente/cliente.component';
import { FuncionarioComponent } from './principal/funcionario/funcionario.component';
import { VendaComponent } from './principal/venda/venda.component';
import { OsComponent } from './principal/os/os.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { OsListComponent } from './principal/os/os-list/os-list.component';
import { ProdutoListComponent } from './principal/produto/produto-list/produto-list.component';
import { VendaListComponent } from './principal/venda/venda-list/venda-list.component';
import { DashboardComponent } from './principal/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { NgxCurrencyModule } from "ngx-currency";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { OsModalComponent } from './principal/os/os-modal/os-modal.component';
import { OsModalDetalhesComponent } from './principal/os/os-modal-detalhes/os-modal-detalhes.component';
import {MatStepperModule} from '@angular/material/stepper';
import { CarrinhoComponent } from './principal/venda/carrinho/carrinho.component';
import { FinalizarVendaComponent } from './principal/venda/finalizar-venda/finalizar-venda.component';
import { ProdutoModalAtualizarComponent } from './principal/produto/produto-modal-atualizar/produto-modal-atualizar.component';
import { DialogModalComponent } from './shared/dialog-modal/dialog-modal.component';
import { AlertaModalComponent } from './shared/dialog-modal/alerta-modal/alerta-modal.component';
import { ClienteBuscaModalComponent } from './shared/buscas/cliente-busca-modal/cliente-busca-modal.component';
import { FuncionarioAtualizarModalComponent } from './principal/funcionario/funcionario-atualizar-modal/funcionario-atualizar-modal.component';
import { FuncionarioDetalhesModalComponent } from './principal/funcionario/funcionario-detalhes-modal/funcionario-detalhes-modal.component';
import { ClienteModalDetalhesComponent } from './principal/cliente/cliente-modal-detalhes/cliente-modal-detalhes.component';
import { ClienteModalAtualizarComponent } from './principal/cliente/cliente-modal-atualizar/cliente-modal-atualizar.component';
import { FuncionarioBuscaModalComponent } from './shared/buscas/funcionario-busca-modal/funcionario-busca-modal.component';
import { ProdutoBuscaModalComponent } from './shared/buscas/produto-busca-modal/produto-busca-modal.component';
import { VendaAtualizarModalComponent } from './principal/venda/venda-atualizar-modal/venda-atualizar-modal.component';
import { VendaDetalhesModalComponent } from './principal/venda/venda-detalhes-modal/venda-detalhes-modal.component';
import { CardComponent } from './shared/card/card.component';
import { VendaDiaComponent } from './principal/venda/venda-list/venda-dia/venda-dia.component';
import { CardVendaComponent } from './shared/card/card-venda/card-venda.component';
import { OsAbertaComponent } from './principal/os/os-list/os-aberta/os-aberta.component';
import { OsFinalizadasComponent } from './principal/os/os-list/os-finalizadas/os-finalizadas.component';
import { LoginComponent } from './principal/login/login.component';
import { HttpInterceptorModule } from './shared/guard/header-interceptor.service';
import { HomeComponent } from './principal/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    ProdutoComponent,
    ClienteComponent,
    FuncionarioComponent,
    VendaComponent,
    OsComponent,
    ClienteListComponent,
    OsListComponent,
    ProdutoListComponent,
    VendaListComponent,
    FuncionarioListComponent,
    DashboardComponent,
    OsModalComponent,
    OsModalDetalhesComponent,
    CarrinhoComponent,
    FinalizarVendaComponent,
    ProdutoModalAtualizarComponent,
    DialogModalComponent,
    AlertaModalComponent,
    ClienteBuscaModalComponent,
    FuncionarioAtualizarModalComponent,
    FuncionarioDetalhesModalComponent,
    ClienteModalDetalhesComponent,
    ClienteModalAtualizarComponent,
    FuncionarioBuscaModalComponent,
    ProdutoBuscaModalComponent,
    VendaAtualizarModalComponent,
    VendaDetalhesModalComponent,
    CardComponent,
    VendaDiaComponent,
    CardVendaComponent,
    OsAbertaComponent,
    OsFinalizadasComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    LayoutModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    NgxCurrencyModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatStepperModule,
    HttpInterceptorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [OsModalComponent,
  OsModalDetalhesComponent]
})
export class AppModule { }
