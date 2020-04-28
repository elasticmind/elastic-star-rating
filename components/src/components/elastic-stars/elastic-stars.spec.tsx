import { newSpecPage } from '@stencil/core/testing';
import { ElasticStars } from './elastic-stars';

describe('elastic-stars', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ElasticStars],
      html: `<elastic-stars></elastic-stars>`,
    });
    expect(page.root).toEqualHtml(`
      <elastic-stars>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </elastic-stars>
    `);
  });
});
