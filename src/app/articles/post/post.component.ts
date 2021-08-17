import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ArticlesService } from 'src/app/services/articles/articles.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private article: ArticlesService
  ) {}
  content;
  title;
  reco;
  async ngOnInit() {
    this.route.params.subscribe((params) => (this.title = params.postTitle));
    console.log(this.title);
    this.content = await this.article.getArticleData(this.title);
    this.reco = await this.article.getRecommendedPosts(this.title);
    console.log(this.reco);
  }
  // navigateTo(title) {
  //   const URL = encodeURI('/articles/' + title);
  //   console.log(URL);
  //   this.router.navigate([URL]);
  // }
}
