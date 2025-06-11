import { inject } from "@angular/core";
import { TokenService } from "../services/token.service";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";

export const authGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.estaLogado()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }

}
