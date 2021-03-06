import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent, BlankComponent} from '@layout/index';
import {RoleGuard} from '@shared/guards/role.guard';
import {RolesEnum} from '@shared/enums/roles.enum';
import {TokenGuard} from '@shared/guards/token.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: '/job-board/professional', pathMatch: 'full'},
      {path: 'dashboard', redirectTo: '/job-board/professional', pathMatch: 'full'},
      // {
      //   path: 'dashboard',
      //   loadChildren: () => import('./pages/core/dashboard/dashboard.module').then(m => m.DashboardModule),
      //   data: {
      //     roles: [RolesEnum.PROFESSIONAL]
      //   },
      //   canActivate: [TokenGuard, RoleGuard]
      // },
      {
        path: 'user-administration',
        loadChildren: () => import('./pages/core/user-administration/user-administration.module').then(m => m.UserAdministrationModule),
        data: {
          roles: [RolesEnum.ADMIN]
        },
        canActivate: [TokenGuard, RoleGuard]
      },
      {
        path: 'job-board',
        loadChildren: () => import('./pages/job-board/job-board.module').then(m => m.JobBoardModule),
        data: {
          roles: [RolesEnum.PROFESSIONAL]
        },
        canActivate: [TokenGuard, RoleGuard]
      }
    ]
  },
  {
    path: 'registration',
    component: BlankComponent,
    loadChildren: () => import('./pages/job-board/registration/registration.module').then(m => m.RegistrationModule)
  },
  {
    path: 'authentication',
    component: BlankComponent,
    loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'common',
    component: BlankComponent,
    loadChildren: () => import('./pages/core/common/common.module').then(m => m.CommonModule)
  },
  {
    path: '**',
    redirectTo: 'common/not-found'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
