import { newE2EPage } from '@stencil/core/testing';

describe('elastic-stars', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<elastic-stars></elastic-stars>');

    const element = await page.find('elastic-stars');
    expect(element).toHaveClass('hydrated');
  });
});
