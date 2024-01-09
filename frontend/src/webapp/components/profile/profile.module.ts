import {NgModule, Renderer2, RendererFactory2} from "@angular/core";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {UserService} from "../../services/user/user.service";
import {BsModalService} from "ngx-bootstrap/modal";

@NgModule({
  providers: [UserService,
              HttpClient,
              BsModalService
  ],
  imports: [HttpClientModule]
})
export class ProfileModule {
}
