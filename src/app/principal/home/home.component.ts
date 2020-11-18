import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'loja';
  @ViewChild(MatAccordion) accordion: MatAccordion;

verifica:boolean = false;

isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private router: Router) {}

  public sair(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  public esconderBarra(){

    if(localStorage.getItem('token') !== null && localStorage.getItem('token').toString().trim() !== null ){
     return false;
   }else{
     return true;
   }
 }
}