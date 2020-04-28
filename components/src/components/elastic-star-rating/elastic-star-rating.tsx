import { Component, ComponentInterface, h, Prop, State, Listen, Element } from '@stencil/core';

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

  @State() displayMode: number = 0;
  @State() isLoading: boolean = true;
  @State() userRating: number;
  @State() averageRating: number;

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
    this.displayMode = DISPLAY_MODE_L;
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
            <h2>
              Average rating: {this.averageRating}
            </h2>
            <h3>
              User rating: {this.userRating}
            </h3>
            <h3>
              Display mode: {this.displayMode}
            </h3>
            <a onClick={this.handleShowDetails.bind(this)}>Show details...</a>
          </div>
        }
      </div>
    );
  }
}
