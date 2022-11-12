import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import dateFormat from 'dateformat';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private restService: RestService) {}

  ngOnInit(): void {
    this.restService.getUserDetails().subscribe({
      next: (data) => {
        this.user = data;
        this.user.joined = dateFormat(
          new Date(this.user.createdAt),
          'd mmm yy'
        );
      },
    });
  }
}
