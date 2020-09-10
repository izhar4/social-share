import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
declare var FB;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'social-share';
  constructor(private readonly meta: Meta){}
  shareOverrideOGMeta(): void {
    const overrideTitle = `${Math.random() * 10} Title`;
    const overrideDescription = `${Math.random() * 10} Desc`;
    const overrideLink = 'https://social-share-angular.herokuapp.com/';
    const overrideImage = 'https://eventbox-prod.s3.amazonaws.com/profile/80245241589900869247.jpg';
    console.log(overrideTitle, overrideDescription)
    // this.meta.updateTag({property: 'og:description', content: 'overriden'});
    FB.ui({
      method: 'share_open_graph',
      action_type: 'og.likes',
      action_properties: JSON.stringify({
        object: {
          'og:url': window.location.href,
          'og:title': overrideTitle,
          'og:description': overrideDescription,
          'og:image': overrideImage,
          'og:image:width': 1279,
          'og:image:height': 853
        }
      })
    },
       (response)=> {
        console.log(response)
        // Action after response
      }, error=> console.log(error));
  }
}
