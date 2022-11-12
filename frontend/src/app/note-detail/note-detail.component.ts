import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';
import dateFormat from 'dateformat';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css'],
})
export class NoteDetailComponent implements OnInit {
  id!: String;
  note: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restService: RestService
  ) {
    this.route.params.subscribe((params) => (this.id = params['id']));
  }

  ngOnInit(): void {
    this.restService.getNote(this.id).subscribe({
      next: (note: any) => {
        this.note = note;
        this.note.createdAt = dateFormat(
          new Date(this.note.createdAt),
          'H:M, d mmm yy'
        );
        this.note.updatedAt = dateFormat(
          new Date(this.note.updatedAt),
          'H:M, d mmm yy'
        );
      },
    });
  }

  onDelete() {
    let del = confirm('Are you sure want to delete this note?');
    if (del) {
      this.restService.deleteNote(this.note._id).subscribe({
        next: () => {
          this.router.navigate(['/notes']);
        },
      });
    }
  }
  updateNote() {
    this.router.navigate(['/add-note/' + this.id]);
  }
}
