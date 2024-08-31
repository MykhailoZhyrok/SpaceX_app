import React, { useState } from 'react';
import FileUploader from './comp/FileUploader';
import TemperatureMap from './comp/TemperatureMap';

const App: React.FC = () => {
  const [temperatureData, setTemperatureData] = useState<Uint8Array | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [loading, setloading] = useState<boolean>(false);

  const handleFileUpload = (data: Uint8Array, fileWidth: number, fileHeight: number) => {
    setTemperatureData(data);
    setWidth(fileWidth);
    setHeight(fileHeight);
  };

  return (
    <div className="App">
      <FileUploader onFileUpload={handleFileUpload} setloading={setloading} />
      {loading ? <h1 style={{textAlign: 'center'}}>Loading...</h1> : <TemperatureMap temperatureData={temperatureData || new Uint8Array()} width={width} height={height} />}
    </div>
  );
};

export default App;
