import { useEffect, useRef, useState } from 'react';
import ThreeScene from '~/three/ThreeScene';

const DefaultThreeScene = () => {
  const refCanvas = useRef<HTMLCanvasElement>(null);
  const [threeScene, setThreeScene] = useState<ThreeScene>();

  useEffect(() => {
    const { current: canvas } = refCanvas;
    if (canvas && !threeScene) {
      const newThreeScene = new ThreeScene(canvas);
      setThreeScene(newThreeScene);
    }
  }, []);

  return (
    <canvas style={{ width: '100%', height: '100%', display: 'block' }} ref={refCanvas}></canvas>
  );
};

export default DefaultThreeScene;
