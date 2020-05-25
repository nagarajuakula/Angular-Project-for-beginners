import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanActivateGuard } from './customer-dashboard/guards/can-activate-guard';
import { AuthComponent } from './Auth/auth.component';

const appRoutes: Routes = [
    {
        path: 'login', 
        component: AuthComponent
        // loadChildren: () => import('./Auth/auth.module').
        //                         then(m=>m.AuthModule)
    },
    { 
        path: '', redirectTo: '/recipes', pathMatch: 'full' 
    },
    { 
        path: 'customers', 
        loadChildren: () => import('./customer-dashboard/customer-dashboard.module').then(m =>
            m.CustomerDashboardModule),
        canLoad: [CanActivateGuard],
    }
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {
        //preloadingStrategy: PreloadAllModules,
        // useHash: true
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
