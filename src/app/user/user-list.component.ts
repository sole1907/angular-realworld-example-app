import { Component, Input } from "@angular/core";

import { UserService, UserListConfig, User } from "../core";
import { DataTableType } from "../core/models/data-table-column.model";
@Component({
  selector: "app-user-list",
  styleUrls: ["user-list.component.css"],
  templateUrl: "./user-list.component.html",
})
export class UserListComponent {
  constructor(private userService: UserService) {}

  @Input() limit: number;
  @Input()
  set config(config: UserListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  query: UserListConfig;
  results: User[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];
  tableColumns: TableColumn[];

  tableConfig: DataTableType = {
    columns: [
      {
        title: "First Name",
        dataProperty: "firstName",
        sortable: false,
        filterable: false,
      },
      {
        title: "Last Name",
        dataProperty: "lastName",
        sortable: false,
        filterable: true,
      },
      {
        title: "Email Address",
        dataProperty: "email",
        sortable: false,
        filterable: true,
      },
      {
        title: "Username",
        dataProperty: "username",
        sortable: false,
        filterable: false,
      },
      {
        title: "Active",
        dataProperty: "active",
        sortable: false,
        filterable: true,
      },
      {
        title: "Verified",
        dataProperty: "active",
        sortable: false,
        filterable: true,
      },
    ],
    rowActions: [
      {
        label: "Edit",
        actionIdToReturn: "edit",
        logoImageUrl: "...",
        showOption: (x) => true,
      },
      {
        label: "Activate",
        actionIdToReturn: "activate",
        logoImageUrl: "...",
        showOption: (x) => !x.isActive,
      },
      {
        label: "De-activate",
        actionIdToReturn: "de-activate",
        logoImageUrl: "...",
        showOption: (x) => x.isActive,
      },
    ],
    rowsPerPage: 20,
  };

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.userService.query(this.query).subscribe((data) => {
      this.loading = false;
      this.results = data.items;

      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      this.totalPages = Array.from(
        new Array(Math.ceil(data.total / this.limit)),
        (val, index) => index + 1
      );
    });
  }
}
