import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatAccordion} from '@angular/material/expansion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
