import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { expect } from 'chai';
import App from '../src/App';
import JSZip from 'jszip';
import sinon from 'sinon';

describe('App Component', () => {
  it('component should input file and assign TemperatureMap', async () => {
    const mockData = new Uint8Array([1, 2, 3, 4, 5]);
    const mockZip = new JSZip();
    mockZip.file('mockFile', mockData.buffer);
    
    const { getByLabelText, getByText, queryByText } = render(<App />);

    const input = getByLabelText('fileInput');
    
    const mockFile = new Blob([await mockZip.generateAsync({ type: 'arraybuffer' })], { type: 'application/zip' });
    Object.defineProperty(input, 'files', { value: [mockFile] });

    fireEvent.change(input);

    await waitFor(() => expect(getByText('Loading...')).to.exist);

    await waitFor(() => expect(queryByText('Loading...')).to.not.exist);

  
    const temperatureMap = getByText(/Temperature Map/i);
    expect(temperatureMap).to.exist; 
  });

  it('show Loading... while loading', async () => {
    const mockData = new Uint8Array([1, 2, 3, 4, 5]);
    const mockZip = new JSZip();
    mockZip.file('mockFile', mockData.buffer);

    const { getByLabelText, getByText, queryByText } = render(<App />);

    const input = getByLabelText('fileInput');
    
    const mockFile = new Blob([await mockZip.generateAsync({ type: 'arraybuffer' })], { type: 'application/zip' });
    Object.defineProperty(input, 'files', { value: [mockFile] });

    fireEvent.change(input);

    await waitFor(() => expect(getByText('Loading...')).to.exist);

    await waitFor(() => expect(queryByText('Loading...')).to.not.exist);
  });

  it('does not show TemperatureMap when there is no data', () => {
    const { queryByText } = render(<App />);

    const temperatureMap = queryByText(/Temperature Map/i);
    expect(temperatureMap).to.not.exist;
  });
});
