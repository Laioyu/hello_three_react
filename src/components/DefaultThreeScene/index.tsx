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
    <div>
      <canvas
        style={{ height: '540px', width: '540px', position: 'relative' }}
        ref={refCanvas}
      ></canvas>
    </div>
  );
};

export default DefaultThreeScene;
