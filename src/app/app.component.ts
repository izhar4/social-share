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
    private readonly metaService: Meta, private readonly router: Router, private route: ActivatedRoute) { }
  shareOverrideOGMeta(): void {
    const overrideTitle = `${Number(Math.random().toFixed(2)) * 100} Title`;
    const overrideDescription = `${Number(Math.random().toFixed(2)) * 100} Desc`;
    const overrideLink = 'https://social-share-angular.herokuapp.com/';
    // const overrideImage = 'https://eventbox-prod.s3.amazonaws.com/profile/49287791599163460440.jpg';
    console.log(overrideTitle, overrideDescription)
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          overrideTitle,
          overrideDescription,
          overrideImage: 'profile/49287791599163460440.jpg'
        },
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }).then(res => {
    // this.metaService.updateTag({ property: 'og:title', content: overrideTitle });
    // this.metaService.updateTag({ property: 'og:url', content: this.dom.URL });
    // this.metaService.updateTag({ property: 'og:image', content: overrideImage });
    // this.metaService.updateTag({ property: 'og:description', content: overrideDescription });
    // this.metaService.updateTag({ property: 'og:image:width', content: '1279' });
    // this.metaService.updateTag({ property: 'og:image:height', content: '853' });



    // this.metaService.updateTag({ property: 'og:image:url', content: coverUrl, itemprop: 'image' });
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
    // this.meta.updateTag({property: 'og:description', content: 'overriden'});

  }
}
