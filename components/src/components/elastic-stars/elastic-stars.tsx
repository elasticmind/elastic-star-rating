import { Component, ComponentInterface, h, Prop, Event, EventEmitter, State } from '@stencil/core';

@Component({
  tag: 'elastic-stars',
  styleUrl: 'elastic-stars.css',
  shadow: true,
})
export class ElasticStars implements ComponentInterface {
  @Prop() maxRating: number;
  @Prop() value: number;

  @State() ratingAnimationPointer: number = this.value - 1;

  @Event() rate: EventEmitter<number>;

  async handleRating(index) {
    const stepRatingAnimation = async (i) => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      this.ratingAnimationPointer = i;
    }

    if (this.ratingAnimationPointer < index) {
      for (let i = this.ratingAnimationPointer; i <= index; i++) {
        await stepRatingAnimation(i)
      }
    } else {
      for (let i = this.ratingAnimationPointer; index <= i; i--) {
        await stepRatingAnimation(i)
      }
    }

    this.rate.emit(index + 1)
  }

  render() {
    return (
      <div class="stars">
        {new Array(this.maxRating).fill(null).map((_, index) => {
          const active = index <= this.ratingAnimationPointer;

          return <elastic-star class={`star ${active && 'active'}`} active={active} onClick={() => this.handleRating(index)} />
        })}
      </div>
    );
  }
}
