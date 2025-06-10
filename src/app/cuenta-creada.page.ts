import { Component } from '@angular/core';

@Component({
  selector: 'app-cuenta-creada',
  standalone: true,
  template: `
    <header class="site-header">
      <div class="logo-container">
        <span class="logo-circle">ST</span>
        <span class="logo-text">ShowTime</span>
      </div>
      <nav class="main-nav">
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Eventos</a></li>
          <li><a href="#">Nosotros</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </nav>
      <div class="auth-buttons">
        <button class="login-btn">Iniciar sesión</button>
        <button class="signup-btn">Crear Cuenta</button>
      </div>
    </header>

    <main>
      <section class="success-section">
        <h2>¡ Bienvenido de nuevo !</h2>
        <div class="success-icon">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="28" cy="28" r="28" fill="#2c3e50" fill-opacity="0.1"/>
            <path d="M18 29.5L25 36.5L38 23.5" stroke="#2c3e50" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <p>Tu cuenta fue creada satisfactoriamente. ¡ Es hora de descubrir eventos !</p>
        <a class="enter-link" href="/">Entrar a la web</a>
      </section>
    </main>

    <footer class="site-footer-bottom">
      <div class="footer-links">
        <h3>Enlaces rápidos</h3>
        <ul>
          <li><a href="#">Acerca de nosotros</a></li>
          <li><a href="#">Términos y condiciones</a></li>
          <li><a href="#">Código de ética</a></li>
        </ul>
      </div>
      <div class="social-media">
        <h3>Síguenos en redes</h3>
      </div>
      <div class="contact-info">
        <h3>Contacto</h3>
        <p>info&#64;showtime.com</p>
        <p>2023 ShowTime - Todos los derechos reservados</p>
        <p><a href="#">Libro de reclamaciones</a></p>
      </div>
    </footer>
  `,
  styleUrls: ['./app.css'],
})
export class CuentaCreadaPage {} 