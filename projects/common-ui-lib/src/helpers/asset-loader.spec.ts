import { loadAsset } from './asset-loader.util';
let location = { origin: 'https://localhost' };
describe('ModifyValueOnPaste', () => {
  it('localhost should load dev URL', () => {
    const url = loadAsset({ type: 'icons', assetName: 'close.svg' });
    console.log(url);
    expect(url).toContain('https://irin3.dev.irasgcc.gov.sg');
  });
  it('uat should load uat URL', () => {
    location.origin = 'https://irin3.uat.irasgcc.gov.sg';
    const url = loadAsset({ type: 'icons', assetName: 'close.svg' });
    console.log(url);
    expect(url).toContain('estamping/assets/icons/close.svg');
  });
});
