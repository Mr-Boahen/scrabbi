import { Routes } from '@angular/router';
import { WodDialogComponent } from './wod-dialog/wod-dialog.component';
import { GameComponent } from './game/game.component';
import { RegisterPageComponent } from './register-page/register-page.component';

export const routes: Routes = [
  {
    path: '',
    component: GameComponent,
    title: 'Scrabbi',

  },
  {
    path:'wod',
    component:WodDialogComponent,
    title:"WOD"
  },
  {
    path:'register',
    component:RegisterPageComponent,
    title:"stats"
  },
  
];
