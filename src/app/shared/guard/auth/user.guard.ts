import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/auth/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
	constructor(private UsersService: UsersService, private router: Router){}

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this.UsersService.getUserLoginStatus()) return true;
		else {
			console.log("Route is authenticated.");
			sessionStorage.setItem('loginError', "You are not allowed to access this URL. Please login to continue.");
			sessionStorage.setItem('returnURL', this.router.url);
			this.router.navigate(['user/signin']);
			return false;
		}
	}
}
