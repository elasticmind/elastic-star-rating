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
  @Prop() maxRating: number;

  @State() userId: string;
  @State() domain: string;

  @State() displayMode: number = DISPLAY_MODE_S;
  @State() isLoading: boolean = true;
  @State() userRating: number;
  @State() averageRating: number;
  @State() ratings: Ratings = [0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 10, 0];

  @Element() el: HTMLElement;

  componentWillLoad() {
    this.userId = Cookies.get(APPLICATION_KEY);
    if (!this.userId) {
      this.userId = uuidv4();
      Cookies.set(APPLICATION_KEY, this.userId)
    }

    this.domain = document.domain;

    new Promise((resolve) => {
      setTimeout(() => {
        this.userRating = 3;
        this.averageRating = 4.4;
        this.isLoading = false;
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

  handleRating(event) {
    this.userRating = event.detail;
  }

  render() {
    return (
      <div class={`star-rating ${displayModeClassesDictionary[this.displayMode]}`}>
        {this.isLoading
          ? <elastic-loader class="loader" />
          : <div>
            <div class="stars-wrapper">
              {this.displayMode === DISPLAY_MODE_S
                ? <elastic-star class="star-decoration" active />
                : <elastic-stars max-rating={this.maxRating} value={this.userRating} onRate={this.handleRating.bind(this)} />
              }
            </div>
            <div class="expander-wrapper">
              <button type="button" class="expander" onClick={this.handleShowDetails.bind(this)} title={`${this.domain} - ${this.userId}`}>
                {this.displayMode === DISPLAY_MODE_L ? 'Hide details' : 'Show details'}
              </button>
              <div class="average">
                {this.averageRating}
              </div>
            </div>
            {this.displayMode === DISPLAY_MODE_L && <elastic-details class="details" ratings={this.ratings} />}
          </div>
        }
      </div>
    );
  }
}
