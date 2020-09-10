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
  constructor(
    @Inject(DOCUMENT) private dom,
    private readonly meta: Meta, private readonly router: Router, private route: ActivatedRoute) { }
  shareOverrideOGMeta(): void {
    const overrideTitle = `${Number(Math.random().toFixed(2)) * 100} Title`;
    const overrideDescription = `${Number(Math.random().toFixed(2)) * 100} Desc`;
    const overrideLink = 'https://social-share-angular.herokuapp.com/';
    const overrideImage = 'https://eventbox-prod.s3.amazonaws.com/profile/80245241589900869247.jpg';
    console.log(overrideTitle, overrideDescription)
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          overrideTitle,
          overrideDescription
        },
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }).then(res => {
        // const canURL = this.dom.URL;
        // const link: HTMLLinkElement = this.dom.createElement('link');
        // link.setAttribute('rel', 'canonical');
        // this.dom.head.appendChild(link);
        // link.setAttribute('href', canURL);
        FB.ui({
          method: 'share_open_graph',
          action_type: 'og.likes',
          action_properties: JSON.stringify({
            object: {
              'og:url': this.dom.URL,
              'og:title': overrideTitle,
              'og:description': overrideDescription,
              'og:image': overrideImage,
              'og:image:width': 1279,
              'og:image:height': 853
            }
          })
        },
          (response) => {
            console.log(response)
            // Action after response
          }, error => console.log(error));
      });
    // this.meta.updateTag({property: 'og:description', content: 'overriden'});

  }
}
