import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TimeAgoPipe } from 'time-ago-pipe';
import { environment } from '../../../environments/environment';
import { getConfig, ignoreSpecialCharacters, toTitleCase } from './functions.service';
import { NotificationService } from './notification.service';
import { RequestsService } from './requests.service';


@Injectable({
  providedIn: 'root',
})
export class HelpersService {

  constructor(
    private _title: Title,
    private _meta: Meta,
    public notifications: NotificationService,
    private requestService: RequestsService,
    private datePipe: TimeAgoPipe
  ) {
  }
  /**
   * Set a new page meta title
   * @param title The new title
   * @param stringCase Case to transform
   */
  public setTitle(title: string) {
    title = ignoreSpecialCharacters(title.trim(), " ");
    if (title.length > 0) {
      this._title.setTitle(toTitleCase(`${title} | ${getConfig("app_name")} - ${environment.name}`, "."))
    } else {
      this._title.setTitle(toTitleCase(`${getConfig("app_name")} - ${environment.name}`, "."))
    }
    const interval = setInterval(() => {
      const navTitle = document.getElementById("aurora-nav-title")
      if (navTitle) {
        navTitle.innerHTML = toTitleCase(title, ".")
        clearInterval(interval)
      }
    }, 500);
  }

  /**
   * Current title
   * @returns current title
   */
  public getTitle(): string {
    return this._title.getTitle()
  }
  public getTimeAgo(date: Date) {
    const result = this.datePipe.transform(date.toString())
      .replace("seconds", "segundos")
      .replace("seconds", "segundos")
      .replace("minutes", "minutos")
      .replace("hours", "horas")
      .replace("days", "días")
      .replace("months", "meses")
      .replace("years", "años")
      .replace("second", "segundo")
      .replace("minute", "minuto")
      .replace("an hour", "una hora")
      .replace("day", "día")
      .replace("month", "mes")
      .replace("year", "año")
      .replace("a ", "un ")
      .replace("an ", "un ")
      .replace("ago", "")

    if (date < new Date()) {
      return result.includes("yesterday") ? "ayer" : "hace " + result
    } else {
      return result.includes("yesterday") ? "hoy" : "en " + result
    }
  }
  /**
   * Set a meta tag element on the head of current HTML
   * @param name
   * @param content
   * @param stringCase
   */
  public setMetaTag(name: string = "", content: string = "") {
    name = name.trim();
    content = content.trim();
    if (name.length > 0 && content.length > 0) {
      const current = this._meta.getTag(`name='${name}'`)
      if (current) {
        current.setAttribute("content", content)
      } else {
        this._meta.addTag({ name, content })
      }
    }
  }

  public async getIcons() {
    const result = await this.requestService.get("/assets/properties/mat-icons.json")
    result.data && Array.isArray(result.data) ? result.data.sort() : []
    return result.data
  }
}


