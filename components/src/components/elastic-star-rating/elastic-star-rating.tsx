import { Component, ComponentInterface, h, Prop, State, Listen, Element } from '@stencil/core';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'cookies-js';

import { Ratings } from '../elastic-details/elastic-details';

const APPLICATION_KEY = '__ElasticStarRating__';

const DISPLAY_MODE_S = 0;
const DISPLAY_MODE_M = 1;
const DISPLAY_MODE_L = 2;

const displayModeClassesDictionary = {
  [DISPLAY_MODE_S]: 'display-mode-s',
  [DISPLAY_MODE_M]: 'display-mode-m',
  [DISPLAY_MODE_L]: 'display-mode-l',
}
@Component({
  tag: 'elastic-star-rating',
  styleUrl: 'elastic-star-rating.css',
  shadow: true,
})
export class ElasticStarRating implements ComponentInterface {
  @Prop() maxRating: number = 5;

  @State() userId: string;
  @State() host: string;

  @State() displayMode: number = DISPLAY_MODE_S;
  @State() isLoading: boolean = true;
  @State() userRating: number;
  @State() averageRating: number;
  @State() ratings: Ratings = [0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 10, 0];

  @Element() el: HTMLElement;

  async componentWillLoad() {
    this.validateProps();

    this.userId = Cookies.get(APPLICATION_KEY);
    if (!this.userId) {
      this.userId = uuidv4();
      Cookies.set(APPLICATION_KEY, this.userId)
    }

    this.host = location.host.replace(':', '_');

    this.userRating = 3;
    this.averageRating = 4.4;
    this.isLoading = false;
    console.log('test:', await fetch('https://gtrw0i4833.execute-api.us-east-1.amazonaws.com/dev/test'));
    // let url = new URL('https://gtrw0i4833.execute-api.us-east-1.amazonaws.com/dev/query')
    // let params = {query: '{greeting(firstName: "Jeremy")}'}
    // url.search = new URLSearchParams(params).toString();
    // console.log('graphql:', await (await fetch(url.toString())).json());

    let url = new URL('https://gtrw0i4833.execute-api.us-east-1.amazonaws.com/dev/createTable');
    let params = { query: `{createTable(host: "${this.host}")}` };
    url.search = new URLSearchParams(params).toString();
    console.log('createTable:', await (await fetch(url.toString())).json());

    url = new URL('https://gtrw0i4833.execute-api.us-east-1.amazonaws.com/dev/query')
    params = {query: `{getRating(host: "${this.host}", userId: "${this.userId}")}`}
    url.search = new URLSearchParams(params).toString();
    const response = await (await fetch(url.toString())).json()
    console.log('userRating:', response.data.getRating);
    this.userRating = response.data.getRating;
  }

  validateProps() {
    if (this.maxRating < 3 || 10 < this.maxRating) {
      throw new Error(`The property maxRating must be between 3 and 10, but received ${this.maxRating}.`);
    }
  }

  @Listen('mouseover')
  protected mouseoverHandler() {
    if (this.displayMode === DISPLAY_MODE_L) {
      return;
    }
    this.displayMode = DISPLAY_MODE_M;
  }

  @Listen('mouseleave')
  protected mouseleaveHandler() {
    if (this.displayMode === DISPLAY_MODE_L) {
      return;
    }
    this.displayMode = DISPLAY_MODE_S;
  }

  @Listen('click', { target: 'window' })
  handleClick(event) {
    if (!this.el.contains(event.target)) {
      this.displayMode = DISPLAY_MODE_S
    }
  }

  handleShowDetails() {
    if (this.displayMode === DISPLAY_MODE_M) {
      this.displayMode = DISPLAY_MODE_L
    } else if (this.displayMode === DISPLAY_MODE_L) {
      this.displayMode = DISPLAY_MODE_M;
    }
  }

  async handleRating(event) {
    const url = new URL('https://gtrw0i4833.execute-api.us-east-1.amazonaws.com/dev/query');
    const params = { query: `mutation {rate(host: "${this.host}", userId: "${this.userId}", rating: ${event.detail})}` };
    url.search = new URLSearchParams(params).toString();
    console.log('rating:', await (await fetch(url.toString())).json());
    this.userRating = event.detail;
  }

  render() {
    const ContentUpper = () => <div class="stars-wrapper">
      {this.displayMode === DISPLAY_MODE_S
        ? <elastic-star class="star-decoration" active />
        : <elastic-stars max-rating={this.maxRating} value={this.userRating} onRate={this.handleRating.bind(this)} />
      }
    </div>

    const ContentLower = () => <div class="expander-wrapper">
      <button type="button" class="expander" onClick={this.handleShowDetails.bind(this)} title={`${this.host} - ${this.userId}`}>
        {this.displayMode === DISPLAY_MODE_L ? 'Hide details' : 'Show details'}
      </button>
      <div class="average">
        {this.averageRating}
      </div>
    </div>

    return (
      <div class={`star-rating ${displayModeClassesDictionary[this.displayMode]}`}>
        {this.isLoading
          ? <elastic-loader class="loader" />
          : <div>
            <ContentUpper />
            <ContentLower />
            {this.displayMode === DISPLAY_MODE_L && <elastic-details class="details" ratings={this.ratings} />}
          </div>
        }
      </div>
    );
  }
}

// userRatings = {
//   userId1: {
//     host1: 3,
//     host2: 4
//   },
//   userId2: {
//     host2: 2,
//     host3: 9
//   },
// }

// hostRatings = {
//   host1: [1, 2, 3, 4, 5],
//   host2: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
// }

/*
endpoints: fetchUserRating, fetchHostAverage, fetchHostRatings
rateHost



*/