import { Component, Input } from '@angular/core';

import { User } from '../core';

@Component({
  selector: 'app-users-preview',
  templateUrl: './article-preview.component.html'
})
export class ArticlePreviewComponent {
  @Input() article: User;

  onToggleFavorite(favorited: boolean) {
    this.article['favorited'] = favorited;

    if (favorited) {
      this.article['favoritesCount']++;
    } else {
      this.article['favoritesCount']--;
    }
  }
}
