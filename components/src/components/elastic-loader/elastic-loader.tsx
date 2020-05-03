import { Component, ComponentInterface, h, Host } from '@stencil/core';

@Component({
  tag: 'elastic-loader',
  styleUrl: 'elastic-loader.css',
  shadow: true,
})
export class ElasticLoader implements ComponentInterface {

  render() {
    return (
      <Host>
        <div class="loader">
          <div/>
        </div>
        <div class="loader">
          <div/>
        </div>
        <div class="loader">
          <div/>
        </div>
        <div class="loader">
          <div/>
        </div>
      </Host>
    );
  }

}
