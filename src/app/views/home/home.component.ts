import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { mainAnimations } from '../../shared/animations/main-animations';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-home',
	animations: [mainAnimations],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	private req: Subscription;

	public source_1: any[];
    public target_1: any[];
   
   	public mandatory_2: any[];
   	public recommended_2: any[];
   	public nonRequestedField_2: any[];


	constructor() { }

    ngOnInit() {
        this.source_1 = ["First name", "Last name", "Grade", "Sub-group"];
        this.target_1 = [];

        this.nonRequestedField_2 = ["Online", "Change Password"];
        this.mandatory_2 = [
            {
                "title": "First name"
            },
            {
                "title": `Last name`
            },
            {
                "title": `Login`
            },
        ];
        this.recommended_2 = [
    		{
    			"title": "E-mail"
    		},
    		{
    			"title": `Member's Activity`,
    			"description": "Councours castor 2018"
    		},
    		{
    			"title": `Skills`,
    			"description": `Elaboration d'un graphe lorem ipsum`
    		},
    		{
    			"title": `Participation code`
    		}
    	];
    }

	ngOnDestroy(){
	}

}
