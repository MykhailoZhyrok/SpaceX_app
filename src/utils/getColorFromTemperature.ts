const getColorFromTemperature = (temp: number) => {
    if(temp>=212||temp<20){
      return { r: 255, g: 0, b: 0, a: 0 }
    }
    const normalizedTemp = temp / 255;
    const colorStops = [
      { temp: 0.1, color: { r: 0, g: 0, b: 255, a: 255 } }, 
      { temp: 0.2, color: { r: 0, g: 255, b: 255, a: 255 } }, 
      { temp: 0.25, color: { r: 0, g: 255, b: 0, a: 255 } }, 
      { temp: 0.3, color: { r: 255, g: 255, b: 0, a: 255 } }, 
      { temp: 0.35, color: { r: 255, g: 165, b: 0, a: 255 } },
      { temp: 1.0, color: { r: 255, g: 0, b: 0, a: 0 } } 
    ];

    let lowerStop = colorStops[0];
    let upperStop = colorStops[colorStops.length - 1];

    for (const stop of colorStops) {
      if (normalizedTemp <= stop.temp) {
        upperStop = stop;
        break;
      }
      lowerStop = stop;
    }
    const ratio = (normalizedTemp - lowerStop.temp) / (upperStop.temp - lowerStop.temp);
    const r = Math.round(lowerStop.color.r + ratio * (upperStop.color.r - lowerStop.color.r));
    const g = Math.round(lowerStop.color.g + ratio * (upperStop.color.g - lowerStop.color.g));
    const b = Math.round(lowerStop.color.b + ratio * (upperStop.color.b - lowerStop.color.b));
    const a = Math.round(lowerStop.color.a + ratio * (upperStop.color.a - lowerStop.color.a));
    return { r, g, b, a };
  };

  export default getColorFromTemperature