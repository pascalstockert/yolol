import { CodePipe } from './code.pipe';

describe('CodePipe', () => {
  it('create an instance', () => {
    const pipe = new CodePipe();
    expect(pipe).toBeTruthy();
  });
});
