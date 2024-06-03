import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(this.getStoredTheme());
  darkMode$ = this.darkMode.asObservable();

  constructor() {
    this.updateBodyClass(this.darkMode.value);
  }

  toggleDarkMode() {
    const isDarkMode = !this.darkMode.value;
    this.darkMode.next(isDarkMode);
    this.setStoredTheme(isDarkMode);
    this.updateBodyClass(isDarkMode);
  }

  updateBodyClass(isDarkMode: boolean) {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  synchronizeTheme() {
    const isDarkMode = this.darkMode.value;
    this.updateBodyClass(isDarkMode);
  }

  private getStoredTheme(): boolean {
    return localStorage.getItem('dark-mode') === 'true';
  }

  private setStoredTheme(isDarkMode: boolean) {
    localStorage.setItem('dark-mode', isDarkMode.toString());
  }
}
