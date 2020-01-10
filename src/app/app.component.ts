import { Component } from "@angular/core";

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
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  source: Column[];
  target: Column[];

  list1: Column[];
  list2: Column[];
  list3: Column[];

  lists: List[];

  ngOnInit() {
    this.source = [
      { name: "Last name", type: FieldType.Recommend },
      { name: "Grade", type: FieldType.Recommend },
      { name: "Sub-group", type: FieldType.Recommend }
    ];

    this.target = [{ name: "First name", type: FieldType.Unknown }];

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
      { header: 'Recommanded fields', list: this.list2 },
      { header: 'Mandatory fields', list: this.list3 },
    ];
  }
}
