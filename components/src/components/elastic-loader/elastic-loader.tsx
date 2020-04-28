import { Component, ComponentInterface, Host, h } from '@stencil/core';

@Component({
  tag: 'elastic-loader',
  styleUrl: 'elastic-loader.css',
  shadow: true,
})
export class ElasticLoader implements ComponentInterface {

  render() {
    return (
      <div class="wrapper">
        <div class="loader" />
        <div class="loader" />
        <div class="loader" />
        <div class="loader" />
      </div>
    );
  }

}
