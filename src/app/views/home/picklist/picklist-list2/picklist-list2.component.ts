import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { mainAnimations } from '../../../../shared/animations/main-animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'picklist-list2',
  animations: [mainAnimations],
  templateUrl: './picklist-list2.component.html',
  styleUrls: ['./picklist-list2.component.scss']
})
export class PicklistList2Component implements OnInit {
	public source_1: any[];
    public target_1: any[];

  	constructor() { }

  	ngOnInit() {
        // first list
        this.source_1 = ["Last name", "Grade", "Sub-group"];
        this.target_1 = ["First name"];
    }

	ngOnDestroy(){
	}

}
