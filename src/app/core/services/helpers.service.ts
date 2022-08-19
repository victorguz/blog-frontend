import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TimeAgoPipe } from 'time-ago-pipe';
import { environment } from '../../../environments/environment';
import {
  getConfig,
  ignoreSpecialCharacters,
  toTitleCase,
} from './functions.service';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor(
    private title: Title,
    private meta: Meta,
    public notifications: ModalService,
    private timeAgo: TimeAgoPipe
  ) {}
  /**
   * Set a new page meta title
   * @param title The new title
   * @param stringCase Case to transform
   */
  public setTitle(title: string) {
    title = ignoreSpecialCharacters(title.trim(), ' ');
    if (title.length > 0) {
      this.title.setTitle(
        toTitleCase(
          `${title} | ${getConfig('app_name')} - ${environment.name}`,
          '.'
        )
      );
    } else {
      this.title.setTitle(
        toTitleCase(`${getConfig('app_name')} - ${environment.name}`, '.')
      );
    }
    const interval = setInterval(() => {
      const navTitle = document.getElementById('aurora-nav-title');
      if (navTitle) {
        navTitle.innerHTML = toTitleCase(title, '.');
        clearInterval(interval);
      }
    }, 500);
  }

  /**
   * Current title
   * @returns current title
   */
  public getTitle(): string {
    return this.title.getTitle();
  }
  public getTimeAgo(date: Date) {
    const result = this.timeAgo
      .transform(date.toString())
      .replace('seconds', 'segundos')
      .replace('seconds', 'segundos')
      .replace('minutes', 'minutos')
      .replace('hours', 'horas')
      .replace('days', 'días')
      .replace('months', 'meses')
      .replace('years', 'años')
      .replace('second', 'segundo')
      .replace('minute', 'minuto')
      .replace('an hour', 'una hora')
      .replace('day', 'día')
      .replace('month', 'mes')
      .replace('year', 'año')
      .replace('a ', 'un ')
      .replace('an ', 'un ')
      .replace('ago', '');

    if (date < new Date()) {
      return result.includes('yesterday') ? 'ayer' : 'hace ' + result;
    } else {
      return result.includes('yesterday') ? 'hoy' : 'en ' + result;
    }
  }
  /**
   * Set a meta tag element on the head of current HTML
   * @param name
   * @param content
   * @param stringCase
   */
  public setMetaTag(name: string = '', content: string = '') {
    name = name.trim();
    content = content.trim();
    if (name.length > 0 && content.length > 0) {
      const current = this.meta.getTag(`name='${name}'`);
      if (current) {
        current.setAttribute('content', content);
      } else {
        this.meta.addTag({ name, content });
      }
    }
  }
}
