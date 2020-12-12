import { ModuleWithProviders, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { UserComponent } from "./user.component";
import { SharedModule } from "../shared";
import { UserRoutingModule } from "./user-routing.module";
import { UserListComponent } from "./user-list.component";

@NgModule({
  imports: [SharedModule, UserRoutingModule],
  declarations: [UserComponent, UserListComponent],
})
export class UserModule {}
