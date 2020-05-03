import { Component, ComponentInterface, h, Prop, State, Listen, Element } from '@stencil/core';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'cookies-js';

import { Ratings } from '../elastic-details/elastic-details';
import { query, mutation } from '../../utils/graphql';

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
  @State() ratings: Ratings;

  @Element() el: HTMLElement;

  async componentWillLoad() {
    this.validateProps();
  }

  async componentDidLoad() {
    this.userId = Cookies.get(APPLICATION_KEY);
    if (!this.userId) {
      this.userId = uuidv4();
      Cookies.set(APPLICATION_KEY, this.userId)
    }

    this.host = location.host.replace(':', '_');
    await mutation({ createTable: { host: this.host } });

    const response = await query({ rating: { host: this.host, userId: this.userId }, average: { host: this.host } });
    this.userRating = response.data.rating;
    this.averageRating = response.data.average;
    this.isLoading = false;
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
      this.displayMode = DISPLAY_MODE_S;
      this.ratings = null;
    }
  }

  async handleShowDetails() {
    if (this.displayMode === DISPLAY_MODE_M) {
      this.displayMode = DISPLAY_MODE_L;
      const response = await query({ details: { host: this.host } });
      this.ratings = JSON.parse(response.data.details);
    } else if (this.displayMode === DISPLAY_MODE_L) {
      this.displayMode = DISPLAY_MODE_M;
      this.ratings = null;
    }
  }

  async handleRating(event) {
    await mutation({ rate: { host: this.host, userId: this.userId, rating: event.detail } });
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
        {this.averageRating.toFixed(1)}
      </div>
    </div>

    return (
      <div class={`star-rating ${displayModeClassesDictionary[this.displayMode]}`}>
        {this.isLoading
          ? <elastic-loader class="loader" />
          : <div>
            <ContentUpper />
            <ContentLower />
            {this.displayMode === DISPLAY_MODE_L && <elastic-details class="details" maxRating={this.maxRating} ratings={this.ratings} />}
          </div>
        }
      </div>
    );
  }
}

