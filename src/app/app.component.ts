import { Component, Inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
declare var FB;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'social-share';
  tweetUrl;
  constructor(
    @Inject(DOCUMENT) private dom,
    private readonly metaService: Meta, private readonly router: Router, private route: ActivatedRoute) { }
  shareOverrideOGMeta(): void {
    const overrideTitle = `${Number(Math.random().toFixed(2)) * 100} Title`;
    const overrideDescription = `${Number(Math.random().toFixed(2)) * 100} Desc`;
    const overrideLink = 'https://social-share-angular.herokuapp.com/';
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          overrideTitle,
          overrideDescription,
          overrideImage: 'logo/9xFQUizaXWhZF6GsbO9bIGK7tGVXcHOfuZMPnOhf.png'
        },
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }).then(res => {
    FB.ui({
      method: 'share_open_graph',
      action_type: 'og.likes',
      action_properties: JSON.stringify({
        object: {
          'og:url': this.dom.URL,
          // 'og:title': overrideTitle,
          // 'og:description': overrideDescription,
          // // 'og:image': overrideImage,
          // 'og:image:width': 1279,
          // 'og:image:height': 853
        }
      })
    },
      (response) => {
        console.log(response)
        // Action after response
      }, error => console.log(error));
    });
  }

  tweet(){
    const baseUrl = 'https://twitter.com/intent/tweet';
    const overrideTitle = `${Number(Math.random().toFixed(2)) * 100} Title`;
    const overrideDescription = `${Number(Math.random().toFixed(2)) * 100} Desc`;
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          overrideTitle,
          overrideDescription,
          overrideImage: 'logo/9xFQUizaXWhZF6GsbO9bIGK7tGVXcHOfuZMPnOhf.png'
        },
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }).then(res => {
        this.tweetUrl = `${baseUrl}?${this.dom.URL}`;
        this.dom.getElementById('tweet-btn').click();
    });

//  this.tweetUrl = `${this.tweetUrl}?`
  }
}
