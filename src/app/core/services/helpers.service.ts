import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { APP_TITLE } from '../constants.config';
import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { NotificacionesService } from './notificaciones.service';
import { isNotEmpty } from 'class-validator';
import { toTitleCase } from './functions.service';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor(
    private title: Title,
    private meta: Meta,
    public notificaciones: NotificacionesService,
    public datePipe: DatePipe,
    public route: Router,
    public formBuilder: FormBuilder
  ) {}
  /**
   * Set a new page meta title
   * @param title
   * @param redirectTo
   */
  public setTitle(title?: string, redirectTo?: string) {
    title = title ? title.trim() : '';
    if (title.length > 0) {
      this.title.setTitle(toTitleCase(`${title} | ${APP_TITLE}`));
    } else {
      this.title.setTitle(toTitleCase(`${APP_TITLE}`));
    }
    const interval = setInterval(() => {
      const navContainer = document.querySelector(
        '.aurora-private-back-container'
      );
      const navLink = document.querySelector('.aurora-private-back-link');
      const navDescription = document.querySelector(
        '.aurora-private-back-description'
      );
      if (navLink && isNotEmpty(redirectTo)) {
        navLink.setAttribute('href', redirectTo!);
      }
      if (navContainer && navDescription) {
        if (title) {
          navDescription.innerHTML = title;
          this.hideElement(navContainer, false);
        } else {
          this.hideElement(navContainer, true);
        }
      }
      clearInterval(interval);
    }, 100);
  }

  /**
   * set title from route
   */
  public setTitleFromSnapshot(route: ActivatedRouteSnapshot | null) {
    if (isNotEmpty(route)) {
      const data = route?.data!;
      let title = data['title'];
      let redirectTo = data['redirectTo'];
      this.setTitle(title, redirectTo);
    } else {
      this.setTitle('');
    }
  }

  /**
   * oculta un elemento html
   * @param element
   * @param hide
   */
  public hideElement(element: Element | null, hide: boolean = true) {
    if (element) {
      if (element.classList.contains('d-none') && !hide) {
        element.classList.remove('d-none');
        element.classList.add('d-flex');
      } else if (element.classList.contains('d-flex') && hide) {
        element.classList.remove('d-flex');
        element.classList.add('d-none');
      }
    }
  }
  /**
   * Current title
   * @returns current title
   */
  public getTitle(): string {
    return this.title.getTitle();
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
