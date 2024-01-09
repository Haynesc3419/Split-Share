import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {first} from "rxjs";
import {AccountService} from "../../../services/account/account.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent implements OnInit {
  formBuilder: FormBuilder;
  loginForm: FormGroup;
  accountService: AccountService;
  route: ActivatedRoute;
  router: Router;
  constructor(formBuilder: FormBuilder,
              accountService: AccountService,
              router: Router,
              route: ActivatedRoute) {
    this.formBuilder = formBuilder;
    this.accountService = accountService;
    this.router = router;
    this.route = route;
    this.loginForm = formBuilder.group({});
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (!this.loginForm.valid) {
      return;
    }

    this.accountService.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
      });
  }
}
