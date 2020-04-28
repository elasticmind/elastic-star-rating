import { Component, ComponentInterface, h, Prop, State, Listen } from '@stencil/core';

@Component({
  tag: 'elastic-star',
  styleUrl: 'elastic-star.css',
  shadow: true,
})
export class ElasticStar implements ComponentInterface {
  @Prop() active: boolean;

  @State() hovered: boolean;

  @Listen('mouseover')
  protected mouseoverHandler() {
    this.hovered = true;
  }

  @Listen('mouseleave')
  protected mouseleaveHandler() {
    this.hovered = false;
  }

  render() {
    return (
      <svg width="100%" height="100%" version="1.1" viewBox="0 0 101.01 96.463" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(-21.687 -102.27)">
          <path transform="scale(1,-1)" d="m72.193-181.15c6.8957 0 24.939-20.098 30.518-16.044 5.5788 4.0532-7.9593 27.424-5.8284 33.982 2.1309 6.5582 26.821 17.508 24.69 24.066-2.1309 6.5582-28.542 0.90476-34.12 4.958-5.5788 4.0532-8.3633 30.918-15.259 30.918s-9.6803-26.865-15.259-30.918c-5.5788-4.0532-31.989 1.6003-34.12-4.958-2.1309-6.5582 22.559-17.508 24.69-24.066 2.1309-6.5582-11.407-29.929-5.8284-33.982s23.622 16.044 30.518 16.044z" fill={this.active || this.hovered ? "#ff0" : "none"} stroke="#000" stroke-linecap="round" stroke-width="2" />
        </g>
      </svg>
    );
  }

}
