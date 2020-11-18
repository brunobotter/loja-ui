import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cardLayout = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          venda: { cols: 1, rows: 1 },
          os: { cols: 1, rows: 1 },
        };
      }
 
     return {
        columns: 2,
        venda: { cols: 2, rows: 2 },
        os: { cols: 2, rows: 2 },
      };
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
