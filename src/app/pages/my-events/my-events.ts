import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface SavedEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
}

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  events: SavedEvent[];
}

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-events.html',
  styleUrl: './my-events.css'
})
export class MyEvents implements OnInit {
  savedEvents: SavedEvent[] = [];
  currentDate: Date = new Date();
  currentMonthYear: string = '';
  daysOfWeek: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  calendarDays: CalendarDay[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadSavedEvents();
      this.updateCalendar();
    }
  }

  loadSavedEvents(): void {
    const events = localStorage.getItem('savedEvents');
    if (events) {
      this.savedEvents = JSON.parse(events);
    }
  }

  saveEvents(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('savedEvents', JSON.stringify(this.savedEvents));
    }
  }

  removeEvent(eventId: number): void {
    this.savedEvents = this.savedEvents.filter(event => event.id !== eventId);
    this.saveEvents();
    this.updateCalendar();
  }

  updateCalendar(): void {
    this.currentMonthYear = this.currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' });
    this.generateCalendarDays();
  }

  generateCalendarDays(): void {
    this.calendarDays = [];
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    // Get the day of the week for the first day of the month (0 for Sunday, 1 for Monday, etc.)
    const firstDayOfWeek = firstDayOfMonth.getDay();

    // Add empty days for the previous month to align the first day
    for (let i = 0; i < firstDayOfWeek; i++) {
      this.calendarDays.push({ date: 0, isCurrentMonth: false, events: [] }); // 0 for empty day
    }

    // Add days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvents = this.savedEvents.filter(event => {
        const eventDate = new Date(event.date.split(' ').slice(0, 3).join(' ')); // Basic parsing, adjust as needed
        return eventDate.getDate() === i && eventDate.getMonth() === month && eventDate.getFullYear() === year;
      });
      this.calendarDays.push({ date: i, isCurrentMonth: true, events: dayEvents });
    }

    // Add empty days for the next month to fill the last week
    const totalDays = this.calendarDays.length;
    const remainingDays = 42 - totalDays; // 6 weeks * 7 days
    for (let i = 0; i < remainingDays; i++) {
      this.calendarDays.push({ date: 0, isCurrentMonth: false, events: [] });
    }
  }

  prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.updateCalendar();
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.updateCalendar();
  }

  // Helper to parse Spanish dates to a Date object (very basic, might need robust solution)
  private parseSpanishDate(dateString: string): Date {
    const parts = dateString.split(' ');
    const day = parseInt(parts[0]);
    const monthName = parts[2];
    const year = parseInt(parts[3]);

    const monthMap: { [key: string]: number } = {
      'Enero': 0, 'Febrero': 1, 'Marzo': 2, 'Abril': 3, 'Mayo': 4, 'Junio': 5,
      'Julio': 6, 'Agosto': 7, 'Septiembre': 8, 'Octubre': 9, 'Noviembre': 10, 'Diciembre': 11
    };
    const month = monthMap[monthName];

    if (isNaN(day) || isNaN(year) || month === undefined) {
      console.warn('Invalid date string for parsing:', dateString);
      return new Date(NaN); // Return an invalid date
    }
    return new Date(year, month, day);
  }

} 