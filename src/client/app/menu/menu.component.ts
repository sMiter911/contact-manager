import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  currentUser: User;

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logOut();
  }

}
