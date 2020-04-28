import { Component, ComponentInterface, h, Prop, State } from '@stencil/core';

export type Ratings = number[];

@Component({
  tag: 'elastic-details',
  styleUrl: 'elastic-details.css',
  shadow: true,
})
export class ElasticDetails implements ComponentInterface {
  @Prop() ratings: Ratings;
  @State() totalRatings: number;
  @State() percentages: number[];

  componentWillRender() {
    this.totalRatings = this.ratings.reduce((sum, rating) => sum + rating, 0);
    this.percentages = this.ratings.map((rating) => rating / this.totalRatings);
  }

  render() {
    return <div class="wrapper">
      {this.ratings.reduceRight((content, rating, index) => {
        const percentage = Number((this.percentages[index] * 100).toFixed(2));

        content.push(<div class="rating">
          <div class="rating-label">
            {index + 1}
          </div>
          <div class="bar-container">
            <div class="bar" style={{ width: `${Math.max(percentage, 1)}%` }}>
            </div>
            <div class="rating-number">
              {rating}
            </div>
          </div>
        </div>)

        return content;
      }, [])}
    </div>
  }
}
