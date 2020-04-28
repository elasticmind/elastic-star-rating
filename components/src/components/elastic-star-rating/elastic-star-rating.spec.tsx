import { newSpecPage } from '@stencil/core/testing';
import { ElasticStarRating } from './elastic-star-rating';

describe('elastic-star-rating', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ElasticStarRating],
      html: `<elastic-star-rating></elastic-star-rating>`,
    });
    expect(page.root).toEqualHtml(`
      <elastic-star-rating>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </elastic-star-rating>
    `);
  });
});
