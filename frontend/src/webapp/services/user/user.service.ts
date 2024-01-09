import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {User} from "../../domain/user";
import {map, Observable} from "rxjs";

@Injectable()
export class UserService {
  baseUrl: any
  httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;

    this.baseUrl = 'http://localhost:8081/api/user';
  }

  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`);
  }

  userExistsByUsername(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/exists/${username}`);
  }
}
