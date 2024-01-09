import {Component, ViewChild} from '@angular/core';
import { CdkListboxModule} from "@angular/cdk/listbox";
import {AccountService} from "../../services/account/account.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.less']
})
export class NavBarComponent {
  accountService: AccountService;

  @ViewChild('select') miscSelect: any;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  onSelectChange(value: any) {
    switch (value) {
      case 'logout': this.accountService.logout();
    }
  }
}
