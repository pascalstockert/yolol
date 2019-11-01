import { PrismicDOMPipe } from './prismic-dom.pipe';

describe('PrismicDOMPipe', () => {
  it('create an instance', () => {
    const pipe = new PrismicDOMPipe();
    expect(pipe).toBeTruthy();
  });
});
