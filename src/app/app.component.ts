import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from './core/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  admin: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router, public auth: AuthService) { 

  }

  ngOnInit() {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     switch (event.url) {
    //       case '/admin':
    //         this.isAdminRoute = true
    //     }
    //   }
    //   console.log(this.isAdminRoute)
    // })
  }

  

}
