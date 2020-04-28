import { newE2EPage } from '@stencil/core/testing';

describe('elastic-details', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<elastic-details></elastic-details>');

    const element = await page.find('elastic-details');
    expect(element).toHaveClass('hydrated');
  });
});
