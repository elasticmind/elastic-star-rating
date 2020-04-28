import { newSpecPage } from '@stencil/core/testing';
import { ElasticLoader } from './elastic-loader';

describe('elastic-loader', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ElasticLoader],
      html: `<elastic-loader></elastic-loader>`,
    });
    expect(page.root).toEqualHtml(`
      <elastic-loader>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </elastic-loader>
    `);
  });
});
