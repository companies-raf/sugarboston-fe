import { Component, signal, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuhComponent } from './shared/menuh/menuh';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuhComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '[class.no-scroll]': 'isMobileMenuOpen'
  }
})
export class App {
  protected readonly title = signal('surgar-boston-frontend');
  public isMobileMenuOpen = false;

  // Método llamado desde el componente header para actualizar el estado
  onMenuStateChange(isOpen: boolean): void {
    this.isMobileMenuOpen = isOpen;
  }
}
