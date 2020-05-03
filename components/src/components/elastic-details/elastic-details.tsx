import { Component, ComponentInterface, h, Prop, State } from '@stencil/core';

export type Ratings = { [key: string]: number };

@Component({
  tag: 'elastic-details',
  styleUrl: 'elastic-details.css',
  shadow: true,
})
export class ElasticDetails implements ComponentInterface {
  @Prop() maxRating: number;
  @Prop() ratings: Ratings;

  @State() totalRatings: number;
  @State() percentages: number[];

  componentWillRender() {
    if (!this.ratings) {
      this.totalRatings = null;
      this.percentages = null;
      return;
    }
    
    this.totalRatings = Object.values(this.ratings).reduce((sum, rating) => sum + rating, 0);
    this.percentages = new Array(this.maxRating).fill(0).map((_, index) => ((index + 1) in this.ratings) ? (this.ratings[index + 1] / this.totalRatings) : 0)
  }

  render() {
    return <div class="wrapper">
      {this.percentages
        ? this.percentages.reduceRight((content, percentage, index) => {
          content.push(<div class="rating">
            <div class="rating-label">
              {index + 1}
            </div>
            <div class="bar-container">
              <div class="bar" style={{ width: `${(percentage * 80).toFixed(2)}%` }}>
              </div>
              <div class="rating-number">
                {this.ratings[index + 1]}
              </div>
            </div>
          </div>)

          return content;
        }, [])
        : <elastic-loader class="loader" />}
    </div>
  }
}
