import { newE2EPage } from '@stencil/core/testing';

describe('elastic-loader', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<elastic-loader></elastic-loader>');

    const element = await page.find('elastic-loader');
    expect(element).toHaveClass('hydrated');
  });
});
