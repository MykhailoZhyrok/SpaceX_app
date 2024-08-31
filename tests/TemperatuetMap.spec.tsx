import { render } from '@testing-library/react';
import TemperatureMap from '../src/comp/TemperatureMap';
import { use, expect } from 'chai';
describe('TemperatureMap Component', () => {

  it('will show image if width is not specified', () => {
    const { container } = render(
      <TemperatureMap temperatureData={[]} width={0} height={500} />
    );
    const img = container.querySelector('img[alt="World Map"]');
    expect(img).to.exist;
  });
  it('renders the canvas when width is specified', () => {
    const { container } = render(
      <TemperatureMap temperatureData={new Uint8Array(10000)} width={100} height={100} />
    );
    const canvas = container.querySelector('canvas');
    expect(canvas).to.exist;
  });
});

