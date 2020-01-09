import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../../shared/services/auth/users.service'
import { mainAnimations } from '../../../../shared/animations/main-animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  animations: [mainAnimations],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
	private req : Subscription;
	private postReq : Subscription;
	public userLoginForm : FormGroup;

	user_email : string;
	user_password : string;
	message	: string = sessionStorage.getItem('loginMessage');
	error	: string = sessionStorage.getItem('loginError');


  	constructor(private router:Router, 
		private activatedRoute: ActivatedRoute,
		private formBuilder: FormBuilder,
		private UsersService: UsersService) { }

  	ngOnInit() {
  		this.createForm();
  	}

  	createForm(){
  		this.userLoginForm = this.formBuilder.group({
	      'email'      : [null, Validators.compose([Validators.required, Validators.email])],
	      'password'   : [null, Validators.compose([Validators.required, Validators.minLength(6)])]
	    });

	    this.req = this.UsersService.getUserLoginForm().subscribe((data) => {
			console.log(data);
		});
  	}

  	loginUser(e){
		//get value from form controls
		this.user_email    = this.userLoginForm.get('email').value;
		this.user_password = this.userLoginForm.get('password').value;
		
		// initialize inputs
	  	let body  = {
	  		'email'    : this.user_email,
	  		'password' : this.user_password,
	  	};

		// execute http post request
		this.postReq = this.UsersService.postLogin(JSON.stringify(body)).subscribe((result) => {
	  		// if error then throw error result 
	  		if(result.error){
	  			window.scroll(0, 0);
	  			sessionStorage.setItem('loginError', result.error);

	  			this.error = sessionStorage.getItem('loginError');
	  			this.error = this.error.split(',').join('<br>');
  			    return this.router.navigate(['/user/signin']);
	  		} 
	  		// if no error, execute login validation
	  		else {
	  			sessionStorage.removeItem('loginError');
	  			sessionStorage.setItem('loginMessage', 'Login was successful.');
	  			sessionStorage.setItem('token', 'Bearer ' + result.token);

	  			this.userLoginForm.reset();
	  			this.message = sessionStorage.getItem('loginMessage');
    	    	this.UsersService.setUserLogin(true);
    			this.router.navigate(['/user/profile']);
	  		}
	  	},
	  	// If error in server/api temporary navigate to error page
		(err) => {
			sessionStorage.setItem('sessionError', err);
			sessionStorage.setItem('sessionUrl', this.router.url);
			this.router.navigate(['/error'])
		});	  
	}

	// Clear error message
	onAlertClose(): void {
		sessionStorage.removeItem('loginError');
		sessionStorage.removeItem('loginMessage');
	   	this.error   = undefined;
	   	this.message = undefined;
	}

  	ngOnDestroy(){
  		sessionStorage.removeItem('loginError');
		sessionStorage.removeItem('loginMessage');
  		
    	this.req.unsubscribe();
  	}

}
