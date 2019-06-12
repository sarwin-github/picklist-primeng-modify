import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { mainAnimations } from '../../shared/animations/main-animations';
import { UsersService } from '../../shared/services/auth/users.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-home',
	animations: [mainAnimations],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	private req: Subscription;
	private countryReq: Subscription;
	public countries = [];
	userData: any = sessionStorage.getItem('token');
	states: any;

	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private usersService: UsersService) { }

	ngOnInit() {
		this.getCountry();
	}

	// get all coutries
	getCountry(){
	  this.countryReq = this.usersService.getCountries()
	  .subscribe((result) => {
	    this.countries = result;
	  });
	}

	selectCountry(event){
		let countryDetails = this.countries.filter(el => el.name === event.target.value);
		let states = countryDetails[0].states;

		this. states = states;
	}

	ngOnDestroy(){
    	if(this.req) this.req.unsubscribe();
    	if(this.countryReq) this.countryReq.unsubscribe();
	}

}
