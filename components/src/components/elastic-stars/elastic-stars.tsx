import { Component, ComponentInterface, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'elastic-stars',
  styleUrl: 'elastic-stars.css',
  shadow: true,
})
export class ElasticStars implements ComponentInterface {
  @Prop() maxRating: number;
  @Prop() value: number;

  @Event() rate: EventEmitter<number>;

  handleRating(rating) {
    if (this.value !== rating) {
      this.rate.emit(rating)
    }
  }

  render() {
    const stars = new Array(this.maxRating).fill(null);

    return (
      <div class="stars">
        {stars.map((_, index) => (
          <elastic-star class="star" active={index <= this.value} />
        ))}
        {/* {stars.map((_, index) => (
          <input
            type="radio"
            id={`rating-${index}`}
            name="rating"
            value={index}
            checked={index + 1 === this.value}
            onChange={() => this.handleRating(index + 1)}
          />
        ))} */}
      </div>
    );
  }
}
