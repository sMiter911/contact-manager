import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token: any;
  error: any;
  currentUser: any;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe(
      x => (this.currentUser = x)
    );

    if (this.currentUser) {
      this.router.navigate(['/contacts']);
    }
  }

  onSubmit(form: NgForm) {
    const values = form.value;

    const payload = {
      username: values.username,
      password: values.password
    };

    this.auth.login(values.username, values.password)
    .pipe(first())
    .subscribe(
      (data) => {
        this.router.navigate(['/contacts']);
      },
      (error) => {
        this.error = error;
      }
    );
  }

}
