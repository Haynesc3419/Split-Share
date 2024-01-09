import { Injectable } from '@angular/core';
import {User} from "../../domain/user";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor() { }

  getCurrentUser(): User | null {
    let userJSON: string | null = localStorage.getItem('user');

    if (userJSON) {
      return JSON.parse(userJSON);
    } else {
      return null;
    }
  }
}
