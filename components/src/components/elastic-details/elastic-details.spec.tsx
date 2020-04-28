import { newSpecPage } from '@stencil/core/testing';
import { ElasticDetails } from './elastic-details';

describe('elastic-details', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ElasticDetails],
      html: `<elastic-details></elastic-details>`,
    });
    expect(page.root).toEqualHtml(`
      <elastic-details>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </elastic-details>
    `);
  });
});
