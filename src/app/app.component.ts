import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
declare var FB;
declare var twttr;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  twitterBtnCount = 0;
  twitterBaseUrl = `https://twitter.com/intent/tweet?`;
  hrefUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent('https://social-share-angular.herokuapp.com?overrideTitle=customTitle&overrideDescription=customdesc&overrideImage=logo/9xFQUizaXWhZF6GsbO9bIGK7tGVXcHOfuZMPnOhf.png')}`;
  title = 'social-share';
  tweetUrl = 'https://twitter.com/intent/tweet?text=Hello';
  constructor(
    @Inject(DOCUMENT) private dom,
    private readonly router: Router, private route: ActivatedRoute) { }

  
  shareOverrideOGMeta(): void {
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
        FB.ui({
          method: 'share_open_graph',
          action_type: 'og.likes',
          action_properties: JSON.stringify({
            object: {
              'og:url': this.dom.URL,
            }
          })
        },
          (response) => {
            console.log(response)
            // Action after response
          }, error => console.log(error));
      });
  }

  createTwitterBtn(): void {
    const overrideTitle = `${Number(Math.random().toFixed(2)) * 100} Title`;
    const overrideDescription = `${Number(Math.random().toFixed(2)) * 100} Desc`;
    const overrideImage = 'logo/9xFQUizaXWhZF6GsbO9bIGK7tGVXcHOfuZMPnOhf.png';
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {
          overrideTitle,
          overrideDescription,
          overrideImage
        },
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }).then(res => {
        this.tweetUrl = this.dom.URL;
        const btnDiv: HTMLElement = document.createElement('div');
        this.twitterBtnCount += 1;
        const btnId = `new-btn-${this.twitterBtnCount}`;
        btnDiv.setAttribute('id', btnId);
        btnDiv.classList.add('btn-div');

        document.getElementById('new-button-div').appendChild(btnDiv);
        twttr.widgets.createShareButton(
          this.tweetUrl,
          document.getElementById(btnId),
          {
            count: 'none',
            text: 'Sharing a URL using the Tweet Button'
          }).then((el) => {
            // document.getElementById('new-button').click();
          });
      });
  }

  generate(): void {
    this.hrefUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(this.getUrl())}`;
    this.dom.getElementById('twitter-share1').setAttribute('href', this.hrefUrl);
    alert(`Url generated successfully you can click on tweet${this.hrefUrl}`);
  }

  getUrl(): string {
    const overrideTitle = `${Number(Math.random().toFixed(2)) * 100} Title`;
    const overrideDescription = `${Number(Math.random().toFixed(2)) * 100} Desc`;
    const overrideImage = 'logo/9xFQUizaXWhZF6GsbO9bIGK7tGVXcHOfuZMPnOhf.png';
    return `https://social-share-angular.herokuapp.com?overrideTitle=${overrideTitle}&overrideDescription=${overrideDescription}&overrideImage${overrideImage}`;
  }
}
