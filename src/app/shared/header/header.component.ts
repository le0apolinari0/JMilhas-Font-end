import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/autenticacao/services/user.service';
import { CadastroComponent } from './../../autenticacao/cadastro/cadastro.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
constructor(
  private userService: UserService,
  private router: Router
) {}
  user$ = this.userService.recuperarToken();

  logout(){
    this.userService.logout();
    this.router.navigate(['auth/login']);
  }

}
