import { Component } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  posts!: any;
  last_post_id!: any;

  //Boolean says if is the last post or not 
  final: boolean = false;
  //Boolean says if there aren't any posts from this profile
  nada: boolean = false;
  //Message for post-final component in case nada is true
  message!: string;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.retrievePosts().subscribe((posts: any) => {
      if (posts.length == 0) {
        this.nada = true;
        this.message = "There aren't any posts yet";
      } else {
      this.last_post_id = posts[posts.length - 1]["id"];
      this.posts = posts;
      }
    })
  }

  reloadPosts() {
    if (this.last_post_id == 1) {
      this.final = true;
    } else {
      this.postService.reloadPosts(this.last_post_id).subscribe((posts: any) => {
        for (let index = 0; index < posts.length; index++) {
          this.posts.push(posts[index]);
        }

        if (posts.length == 0) {
          this.final = true;
          // console.log("No hay más posts")
        } else {
          this.last_post_id = posts[posts.length - 1]["id"];
        }
      })
    }
  }
}
