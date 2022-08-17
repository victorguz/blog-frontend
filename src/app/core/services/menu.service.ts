import { Injectable } from "@angular/core";
import { MenuOption } from "src/app/core/models/menu-option.model";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { environment } from "src/environments/environment";
import { menuOptions } from "../menu.config";
import { removeFromLocal, getFromLocal, setOnLocal, getCurrentUser } from "./functions.service";

@Injectable({
  providedIn: 'root',
})
export class MenuService {


  constructor(private authService: AuthService) { }
  /**
   * Consulta los módulos a los que tiene acceso el usuario en esta sesión.
   * @returns Los módulos
   */
  public getOptions(): MenuOption[] {
    const role = this.authService.getCurrentUserRole()
    const result: MenuOption[] = []

    if (typeof role == "undefined") {
      throw new Error("Usuario con rol 'undefined'");
    }
    menuOptions.forEach((module, index) => {
      if (module.options && module.options.length) {
        const filteredOptions = getFilteredOptions(module.options)
        if (filteredOptions && filteredOptions.length) {
          module.options = filteredOptions
          result.push(module)
        }
      } else if (module.route) {
        const filteredOptions = getFilteredOptions([module])
        if (filteredOptions && filteredOptions.length) {
          result.push(module)
        }
      }
    });

    function getFilteredOptions(options: MenuOption[]): MenuOption[] {
      return options.filter(option => {
        if (option.options) {
          const res = getFilteredOptions(option.options)
          return res && res.length > 0
        } else {
          return typeof role != "undefined" && (option.roles?.find(r => { return role <= r }))
        }
      })
    }

    return result
  }

  public searchModule(name: string) {
    name = name.trim().toUpperCase()
    let all = this.getOptions()
    if (all && Array.isArray(all)) {
      return all.filter((value: MenuOption) => {
        return value.name?.toUpperCase().match(`(${name})`)
      })
    } else {
      return []
    }
  }

  public getCurrentModuleOptions(): MenuOption {
    const result = getFromLocal(environment.LOCAL_CURRENT_MODULE);
    return result ? result : {};
  }

  public setCurrentModuleOptions(modulo: MenuOption) {
    setOnLocal(environment.LOCAL_CURRENT_MODULE, modulo);
  }

  public deleteCurrentModuleOptions() {
    removeFromLocal(environment.LOCAL_CURRENT_MODULE);
  }

}
