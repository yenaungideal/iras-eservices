export type TAssetRootPathNameTypes = 'icons' | 'images' | 'css';
export const loadAsset = ({ type, assetName }: { type: TAssetRootPathNameTypes; assetName: string }) => {
  const origin = location.origin;
  return (
    (origin.startsWith('https://localhost') || origin.startsWith('http://localhost')
      ? 'https://irin3.dev.irasgcc.gov.sg'
      : origin) + `/estamping/assets/${type}/${assetName}`
  );
};
