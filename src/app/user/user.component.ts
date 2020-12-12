import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  User,
  UserService
} from '../core';

@Component({
  selector: 'app-users-page',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  user: User;
  currentUser: User;
  canModify: boolean;
  isSubmitting = false;
  isDeleting = false;

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    // Retreive the prefetched article
    // this.route.data.subscribe(
    //   (data: { user: User }) => {
    //     this.user = data.user;

    //     // Load the comments on this article
    //     // this.populateComments();
    //   }
    // );

    // Load the current user's data
    // this.userService.currentUser.subscribe(
    //   (userData: User) => {
    //     this.currentUser = userData;

    //     // this.canModify = (this.currentUser.username === this.article.author.username);
    //   }
    // );
  }

  // onToggleFavorite(favorited: boolean) {
  //   this.article.favorited = favorited;

  //   if (favorited) {
  //     this.article.favoritesCount++;
  //   } else {
  //     this.article.favoritesCount--;
  //   }
  // }

  // onToggleFollowing(following: boolean) {
  //   this.article.author.following = following;
  // }

  // deleteArticle() {
  //   this.isDeleting = true;

  //   this.articlesService.destroy(this.article.slug)
  //     .subscribe(
  //       success => {
  //         this.router.navigateByUrl('/');
  //       }
  //     );
  // }

  // populateComments() {
  //   this.commentsService.getAll(this.article.slug)
  //     .subscribe(comments => this.comments = comments);
  // }

  // addComment() {
  //   this.isSubmitting = true;
  //   this.commentFormErrors = {};

  //   const commentBody = this.commentControl.value;
  //   this.commentsService
  //     .add(this.article.slug, commentBody)
  //     .subscribe(
  //       comment => {
  //         this.comments.unshift(comment);
  //         this.commentControl.reset('');
  //         this.isSubmitting = false;
  //       },
  //       errors => {
  //         this.isSubmitting = false;
  //         this.commentFormErrors = errors;
  //       }
  //     );
  // }

  // onDeleteComment(comment) {
  //   this.commentsService.destroy(comment.id, this.article.slug)
  //     .subscribe(
  //       success => {
  //         this.comments = this.comments.filter((item) => item !== comment);
  //       }
  //     );
  // }

}
