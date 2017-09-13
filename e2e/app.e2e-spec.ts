import { HisptzWebsitePage } from './app.po';

describe('hisptz-website App', () => {
  let page: HisptzWebsitePage;

  beforeEach(() => {
    page = new HisptzWebsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
