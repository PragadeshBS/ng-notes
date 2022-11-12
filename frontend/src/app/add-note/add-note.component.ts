import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent implements OnInit {
  addNoteForm!: FormGroup;
  updateFormId!: String;
  existingNote: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private restService: RestService
  ) {
    this.route.params.subscribe((params) => (this.updateFormId = params['id']));
  }

  ngOnInit(): void {
    if (this.updateFormId) {
      this.restService.getNote(this.updateFormId).subscribe({
        next: (note) => {
          this.existingNote = note;
          this.addNoteForm = this.formBuilder.group({
            title: [this.existingNote.title, Validators.required],
            content: [this.existingNote.content, Validators.required],
          });
        },
      });
    }
    this.addNoteForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmit() {
    this.restService
      .addNote({
        title: this.addNoteForm.controls['title'].value,
        content: this.addNoteForm.controls['content'].value,
        createdBy: localStorage.getItem('user'),
      })
      .subscribe({ next: () => this.router.navigate(['/notes']) });
  }

  onUpdate() {
    this.restService
      .updateNote(this.updateFormId, {
        title: this.addNoteForm.controls['title'].value,
        content: this.addNoteForm.controls['content'].value,
      })
      .subscribe({ next: () => this.router.navigate(['/notes']) });
  }
}
