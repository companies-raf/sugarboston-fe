import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuhComponent } from './shared/menuh/menuh';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuhComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('surgar-boston-frontend');
}
