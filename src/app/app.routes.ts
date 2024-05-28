import { Routes } from '@angular/router';
import { WodDialogComponent } from './wod-dialog/wod-dialog.component';
import { GameComponent } from './game/game.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LeaderBoardPageComponent } from './leader-board-page/leader-board-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';

export const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    title: 'Scrabtype',

  },
  {
    path:'wod',
    component:WodDialogComponent,
    title:"WOD"
  },
  {
    path:'register',
    component:RegisterPageComponent,
    title:"register"
  },
  {
    path:'login',
    component:LoginPageComponent,
    title:"login"
  },
  {
    path:'leaderboard',
    component:LeaderBoardPageComponent,
    title:"leaderBoard"
  },
  {
    path:'profile',
    component:ProfilePageComponent,
    title:"profile"
  },
  {
    path:'error',
    component:ErrorPageComponent,
    title:"error-page"
  },
  
];
