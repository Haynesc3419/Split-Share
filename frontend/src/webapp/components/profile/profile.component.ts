import { Component, OnInit } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {UserService} from "../../services/user/user.service";
import {User} from "../../domain/user";
import {ExerciseService} from "../../services/exercise/exercise.service";
import {Exercise} from "../../domain/exercise";
import {SaveExerciseModalComponent} from "../exercise/save-exercise/save-exercise-modal.component";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../services/user/current-user.service";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.less'
})
export class ProfileComponent implements OnInit {
  userService: UserService;
  user: any;
  bsModalRef: BsModalRef = new BsModalRef<any>();
  bsModalService: BsModalService;
  exerciseService: ExerciseService;
  currentUserService: CurrentUserService;
  userPhoto: string = '/assets/images/default-profile.jpg';
  savedExercises: Exercise[] = [];
  router: Router;
  currentUser: User | null;

  constructor(userService: UserService,
              bsModalService: BsModalService,
              exerciseService: ExerciseService,
              currentUserService: CurrentUserService,
              router: Router) {
    this.userService = userService;
    this.bsModalService = bsModalService;
    this.currentUserService = currentUserService;
    this.exerciseService = exerciseService;
    this.router = router;

    this.currentUser = currentUserService.getCurrentUser();
  }
  ngOnInit(): void {
    if (this.currentUser) {
      this.userService.getUserById(this.currentUser.id).subscribe((user: User) => {
        this.user = user;
      });
    } else {
      this.router.navigateByUrl('login');
    }
  }
}
