import { newSpecPage } from '@stencil/core/testing';
import { ElasticStar } from './elastic-star';

describe('elastic-star', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ElasticStar],
      html: `<elastic-star></elastic-star>`,
    });
    expect(page.root).toEqualHtml(`
      <elastic-star>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </elastic-star>
    `);
  });
});
