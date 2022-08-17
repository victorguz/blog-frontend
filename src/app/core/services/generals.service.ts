import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { RequestsService } from "./requests.service";

@Injectable({
  providedIn: 'root',
})
export class GeneralsService {

  constructor(private _requestService: RequestsService, private router: Router) { }

}
