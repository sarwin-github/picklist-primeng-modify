import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, filter, switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { hostUrl } from '../host-config';

const endpoint = hostUrl + '/api/user/login';

@Injectable({
  	providedIn: 'root'
})
export class UsersService {
	private isUserLoggedIn: any;

  	constructor(private http: Http, 
  		private router: Router) {
  	}


  	// Get user login form
	getUserLoginForm(): Observable<any>{
		return this.http
		.get(`${hostUrl}/api/user/signin`)
		.pipe(
			map(res => res.json()),
			catchError(this.handleError)
		);
	}

	// post login user
	postLogin(body: any): Observable<any>{
		return this.http
		.post(`${hostUrl}/api/user/signin`, body, { withCredentials : true })
		.pipe(
			map(res => res.json()),
			catchError(this.handleError)
		);
	}

	// get signup form
	getUserSignupForm(): Observable<any>{
		return this.http
		.get(`${hostUrl}/api/user/signup`, { withCredentials : true})
		.pipe(
			map(res => res.json()),
			catchError(this.handleError)
		);
	}

	// post signup user
	postSignUp(body: any): Observable<any>{
		return this.http
		.post(`${hostUrl}/api/user/signup`, body, { withCredentials : true})
		.pipe(
			map(res => res.json()),
			catchError(this.handleError)
		);
	}

	// get login status from session storage
	getUserProfile(): any {
		return this.http
		.get(`${hostUrl}/api/user/profile`, { withCredentials : true})
		.pipe(
			map(res => res.json()),
			catchError(this.handleError)
		);
	}

	// get login status from session storage
	getUserLoginStatus(): any {
		let storedItem:any = sessionStorage.getItem('userLogin');
        if(!storedItem) return false;
        	else return storedItem;
	}

	// logout user
	logoutUser(): Observable<any>{
		return this.http
		.get(`${hostUrl}/api/user/logout`, { withCredentials : true})
		.pipe(
			map(res => {
				sessionStorage.clear();
				this.isUserLoggedIn = false;
				this.router.navigate(['/user/signin']);
				return res.json();
			}),
			catchError(this.handleError)
		);
	}

	// set login status to true in local storage
	setUserLogin(status: any): void {
		sessionStorage.setItem('userLogin', status);
		this.isUserLoggedIn = true;
	}

	// error handler
	private handleError(error:any, caught:any): any{
		sessionStorage.setItem('notFound', 'true');
		throw error;
	}
}
