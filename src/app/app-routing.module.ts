import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { PostComponent } from './articles/post/post.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { SignupComponent } from './signup/signup.component';
import { CheckoutComponent } from './store/checkout/checkout.component';
import { StoreComponent } from './store/store/store.component';
import { SuccessComponent } from './store/success/success.component';

const routes: Routes = [
  { path: '', component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // { path: 'post-create', component: PostCreateComponent },
  { path: 'post-list', component: PostListComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/:postTitle', component: PostComponent },
  { path: 'store', component: StoreComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'success', component: SuccessComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
