import { Component, HostListener, OnInit, OnDestroy, HostBinding, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menuh',
  imports: [CommonModule],
  templateUrl: './menuh.html',
  styleUrl: './menuh.scss'
})
export class MenuhComponent implements OnInit, OnDestroy {
  public isMobileMenuOpen = false;

  // Output para comunicar cambios de estado al componente padre
  @Output() menuStateChange = new EventEmitter<boolean>();

  // HostBinding para aplicar clase CSS al elemento host
  @HostBinding('class.menu-open') 
  get isMenuOpen() { 
    return this.isMobileMenuOpen; 
  }

  ngOnInit(): void {
    // Cerrar el menú móvil si se carga en una pantalla grande
    this.checkScreenSize();
  }

  ngOnDestroy(): void {
    // El HostBinding se encarga automáticamente de limpiar las clases
  }

  /**
   * Alterna la visibilidad del menú móvil
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    this.menuStateChange.emit(this.isMobileMenuOpen);
  }

  /**
   * Cierra el menú móvil
   */
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.menuStateChange.emit(this.isMobileMenuOpen);
  }

  /**
   * Escucha el evento de redimensionamiento de la ventana
   * Cierra automáticamente el menú móvil si la pantalla se hace más grande
   */
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any): void {
    this.checkScreenSize();
  }

  /**
   * Escucha clics fuera del menú para cerrarlo en móviles
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    
    // Si se hace clic fuera del menú y el botón, cerrar el menú
    if (this.isMobileMenuOpen && 
        mobileMenu && 
        mobileMenuButton && 
        !mobileMenu.contains(target) && 
        !mobileMenuButton.contains(target)) {
      this.closeMobileMenu();
    }
  }

  /**
   * Escucha la tecla Escape para cerrar el menú móvil
   */
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  /**
   * Verifica el tamaño de la pantalla y cierra el menú móvil si es necesario
   */
  private checkScreenSize(): void {
    if (typeof window !== 'undefined' && window.innerWidth >= 768 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
}
