import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { mainAnimations } from '../../../../shared/animations/main-animations';
import { Subscription } from 'rxjs';


enum FieldType {
  NonRequested = "non-requested",
  Recommend = "recommend",
  Mandatory = "mandatory",
  Unknown = "unknown"
}

interface Column {
  name: string;
  remark?: string;
  type: FieldType;
}

interface List {
  header: string;
  list: Column[];
}

@Component({
  selector: 'picklist-list3',
  animations: [mainAnimations],
  templateUrl: './picklist-list3.component.html',
  styleUrls: ['./picklist-list3.component.scss']
})
export class PicklistList3Component implements OnInit {
  	list1: Column[];
  	list2: Column[];
  	list3: Column[];

  	lists: List[];

  	ngOnInit() {
	    this.list1 = [
	      { name: "Online", type: FieldType.NonRequested },
	      { name: "Change password", type: FieldType.NonRequested }
	    ];

	    this.list2 = [
	      { name: "E-mail", type: FieldType.Recommend },
	      {
	        name: "Member's activity",
	        remark: "Concours castor 2018",
	        type: FieldType.Recommend
	      },
	      { name: "Skills", remark: "unknown ...", type: FieldType.Recommend },
	      { name: "Participation code", type: FieldType.Recommend }
	    ];

	    this.list3 = [
	      { name: "First name", type: FieldType.Mandatory },
	      { name: "Last name", type: FieldType.Mandatory },
	      { name: "Login", type: FieldType.Mandatory }
	    ];

	    this.lists = [
	      { header: 'Non-requested fields', list: this.list1 },
	      { header: 'Recommended fields', list: this.list2 },
	      { header: 'Mandatory fields', list: this.list3 },
	    ];
  	}

}
