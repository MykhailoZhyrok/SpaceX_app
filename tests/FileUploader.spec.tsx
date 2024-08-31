import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { expect } from 'chai';
import FileUploader from '../src/comp/FileUploader';
import JSZip from 'jszip';
import sinon from 'sinon';

describe('FileUploader Component', () => {
  it('call onFileUpload with true after input file', async () => {
    const mockData = new Uint8Array([1, 2, 3, 4, 5]);
    const mockZip = new JSZip();
    mockZip.file('mockFile', mockData.buffer);
    const mockOnFileUpload = sinon.spy();
    const mockSetLoading = sinon.spy();

    const { getByLabelText } = render(
      <FileUploader onFileUpload={mockOnFileUpload} setloading={mockSetLoading} />
    );

    const input = getByLabelText('fileInput');
    
    const mockFile = new Blob([await mockZip.generateAsync({ type: 'arraybuffer' })], { type: 'application/zip' });
    Object.defineProperty(input, 'files', { value: [mockFile] });
    
    fireEvent.change(input);

    await waitFor(() => expect(mockSetLoading.calledWith(true)).to.be.true);
    await waitFor(() => expect(mockOnFileUpload.calledWith(mockData, 36000, 17999)).to.be.true);
    await waitFor(() => expect(mockSetLoading.calledWith(false)).to.be.true);
  });
});
