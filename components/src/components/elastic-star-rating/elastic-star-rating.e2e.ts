import { newE2EPage } from '@stencil/core/testing';

describe('elastic-star-rating', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<elastic-star-rating></elastic-star-rating>');

    const element = await page.find('elastic-star-rating');
    expect(element).toHaveClass('hydrated');
  });
});
