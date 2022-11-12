import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  notes: any[] = [];
  constructor(private restService: RestService, private router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    }
    this.restService
      .getNotes()
      .subscribe({ next: (note: any) => this.notes.push(note) });
  }
  onDelete(x: any) {
    console.log('delete', x);
  }
  onClick(noteId: any) {
    this.router.navigate(['/notes/' + noteId]);
  }
}
