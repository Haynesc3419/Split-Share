import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {first} from "rxjs";
import {AccountService} from "../../../services/account/account.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../domain/user";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less'
})
export class RegisterComponent implements OnInit {
  formBuilder: FormBuilder;
  registerForm: FormGroup;
  accountService: AccountService;
  userService: UserService;
  route: ActivatedRoute;
  router: Router;

  errorMessage: string = "";
  constructor(formBuilder: FormBuilder,
              accountService: AccountService,
              userService: UserService,
              router: Router,
              route: ActivatedRoute) {
    this.formBuilder = formBuilder;
    this.accountService = accountService;
    this.router = router;
    this.route = route;
    this.registerForm = formBuilder.group({});
    this.userService = userService;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      dob: ['', Validators.required]
    });
  }

  submit() {
    if (!this.registerForm.valid) {
      console.log('error');
      return;
    }

    this.userService.userExistsByUsername(this.registerForm.controls['username'].value).subscribe((
      (usernameExists: boolean) => {
        if (usernameExists) {
          this.errorMessage = "Username taken, try another";
        } else {
          this.accountService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(()=>{
              this.accountService.login(this.registerForm.controls['username'].value,
                this.registerForm.controls['password'].value);
              this.router.navigateByUrl('');
            });
        }
      }
    ));
  }
}
