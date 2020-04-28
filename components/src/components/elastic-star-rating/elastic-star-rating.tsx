import { Component, ComponentInterface, h, Prop, State, Listen, Element } from '@stencil/core';

import { Ratings } from '../elastic-details/elastic-details';

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
  @Prop() maxRating: number;

  @State() displayMode: number = DISPLAY_MODE_L;
  @State() isLoading: boolean = true;
  @State() userRating: number;
  @State() averageRating: number;
  @State() ratings: Ratings = [0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 10, 0];

  @Element() el: HTMLElement;

  componentWillLoad() {
    new Promise((resolve) => {
      setTimeout(() => {
        this.userRating = 3;
        this.averageRating = 4.4;
        this.isLoading = false;
        this.handleRating(this.userRating);
        resolve()
      }, 10);
    })
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

  handleRating(rating) {
    if (this.userRating !== rating) {
      this.userRating = rating;
    }
  }

  render() {
    const stars = new Array(this.maxRating).fill(null);

    return (
      <div class={`star-rating ${displayModeClassesDictionary[this.displayMode]}`}>
        {this.isLoading
          ? <elastic-loader class="loader" />
          : <div>
            <div>
              {stars.map((_, index) => (
                <input
                  type="checkbox"
                  id={`rating-${index}`}
                  name="rating"
                  value={index}
                  onChange={() => this.handleRating(index + 1)}
                />
              ))}
            </div>
            <h5>
              Average rating: {this.averageRating}
            </h5>
            <h5>
              User rating: {this.userRating}
            </h5>
            <a onClick={this.handleShowDetails.bind(this)}>
              {this.displayMode === DISPLAY_MODE_L ? 'Hide details...' : 'Show details...'}
            </a>
            {this.displayMode === DISPLAY_MODE_L && <elastic-details ratings={this.ratings} />}
          </div>
        }
      </div>
    );
  }
}
