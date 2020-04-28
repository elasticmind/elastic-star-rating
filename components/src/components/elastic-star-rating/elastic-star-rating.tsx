import { Component, ComponentInterface, h } from '@stencil/core';

@Component({
  tag: 'elastic-star-rating',
  styleUrl: 'elastic-star-rating.css',
  shadow: true,
})
export class ElasticStarRating implements ComponentInterface {

  render() {
    return (
      <h1>Hi!</h1>
    );
  }

}
