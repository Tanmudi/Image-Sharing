import { Routes } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { SignUpComponent } from "./user/sign-up/sign-up.component";
import { SignInComponent } from "./user/sign-in/sign-in.component";
import { HomeComponent } from "./home/home.component";
import { AboutUsComponent } from "./about-us/about-us.component";
import { AuthGuard } from "./auth/auth.guard";
import { GallaryComponent } from "./gallary/gallary.component";
import { DownloadComponent } from "./download/download.component";

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{path: '', component: SignUpComponent}]
    },
    {
        path: 'login', component: UserComponent,
        children: [{path: '', component: SignInComponent}]
    },
    {
        path: 'home', component: HomeComponent, canActivate:[AuthGuard]
    },
    {
        path: 'aboutUs', component: AboutUsComponent, canActivate: [AuthGuard]
    },
    {
        path: 'gallary', component: GallaryComponent, canActivate: [AuthGuard]
    },
    {
        path: 'download', component: DownloadComponent, canActivate: [AuthGuard]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];