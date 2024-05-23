import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(this.getStoredTheme());
  darkMode$ = this.darkMode.asObservable();

  constructor() {}

  toggleDarkMode() {
    const isDarkMode = !this.darkMode.value;
    this.darkMode.next(isDarkMode);
    this.setStoredTheme(isDarkMode);
    this.updateBodyClass(isDarkMode);
  }

  public updateBodyClass(isDarkMode: boolean) { // Cambiar a public
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  private getStoredTheme(): boolean {
    return localStorage.getItem('dark-mode') === 'true';
  }

  private setStoredTheme(isDarkMode: boolean) {
    localStorage.setItem('dark-mode', isDarkMode.toString());
  }
}
