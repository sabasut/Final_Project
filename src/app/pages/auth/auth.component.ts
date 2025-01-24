import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  Incorrect: boolean = false;
  Emptycredentials: boolean = false;
  constructor(private authservice: AuthService, private router: Router) {

  }




  signIn() {
    this.Emptycredentials = false;  //  ავტორიზაციიის ხელახალი მცდელობისას რო წინა შეტყობინება არ ჩაიტოვოს
    this.Incorrect = false  //  ავტორიზაციიის ხელახალი მცდელობისას რო წინა შეტყობინება არ ჩაიტოვოს 

    if (this.email && this.password) {  ///  თუ მომხარებელი და პაროლი არ შეიყვანა და ისე სცადა ავტორიზაცია , გამოიტანს ალერტს
      if (this.email === "Admin" && this.password === "Admin") {   /// ადმინის იუზერი
        this.router.navigate(['/admin']);
        this.authservice.setToken("AdminUser");

      }
      else {


        this.authservice.login(this.email, this.password).subscribe({ //  სხვა fake api -სის იუზერები
          next: (response) => {
            if (response && response.token) {
              this.authservice.setToken(response.token);  /// ლოკალსთორიჯში ინახავს ტოკენს
              this.router.navigate(['/home']);   /// ნავიგაცია ჰოუმ გვერზე,  ავტორიზაციის(ტოკენის) შემთხვევაშუ
            }
          },
          error: (error) => {
            this.Incorrect = true
            console.error('Login failed:', error);
          },
        });
      }
    }
    else {
      this.Emptycredentials = true;
    }
  }




  /// რეგისტრაციის კომპონენტზე ნავიგაცია  ,  
  navigateToRegister() {

  }
}
