import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/auth/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'header-nav',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	private req: Subscription;
	loggedInUser: any;

  	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private UsersService: UsersService) { 
  		this.req = this.router.events.subscribe(x => {
			this.loggedInUser = this.UsersService.getUserLoginStatus();
		});
  	}

  	ngOnInit() {
  	}

  	userLogout(){
		this.req = this.UsersService
			.logoutUser()
			.subscribe((data) => {
				window.scrollTo(0, 0);
		}, 
		// If error temporary navigate to error page
		(err) => this.router.navigate(['error']));
	}

	ngOnDestroy(){
		if(this.req) this.req.unsubscribe();
	}

}
