import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { LogoutComponent } from './pages/auth/logout/logout.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ProductDetailsComponent } from './pages/product/product-details/product-details.component';
import { ProductListComponent } from './pages/product/list/list.component';
import { CartComponent } from './pages/product/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'product-list',
                component: ProductListComponent
            },
            {
                path: 'product-details/:id',
                component: ProductDetailsComponent
            },
            {
                path: 'my-cart',
                component: CartComponent
            }
        ]
    }
];
