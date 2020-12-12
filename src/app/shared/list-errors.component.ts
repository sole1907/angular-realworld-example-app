import { Component, Input } from "@angular/core";

import { Errors } from "../core";

@Component({
  selector: "app-list-errors",
  templateUrl: "./list-errors.component.html",
})
export class ListErrorsComponent {
  formattedErrors: Array<string> = [];

  @Input()
  set errors(errorList: Errors) {
    console.log("error list -> ", errorList);
    this.formattedErrors = [];
    errorList.err &&
      errorList.err.message &&
      this.formattedErrors.push(errorList.err.message);
    // this.formattedErrors = Object.keys(errorList.err || {}).map(
    //   (key) => `${key} ${errorList.err[key]}`
    // );
    // console.log("formatted error list ", this.formattedErrors);
  }

  get errorList() {
    return this.formattedErrors;
  }
}
