import { newE2EPage } from '@stencil/core/testing';

describe('elastic-star', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<elastic-star></elastic-star>');

    const element = await page.find('elastic-star');
    expect(element).toHaveClass('hydrated');
  });
});
