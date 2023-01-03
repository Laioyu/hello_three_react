import * as THREE from 'three';
import { GridHelper, Group } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

class ThreeScene {
  private _canvas: HTMLCanvasElement;
  private _webglRenderer: THREE.WebGLRenderer;
  private _scene: THREE.Scene;
  private _activeCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  private _activeControl: OrbitControls;
  private _gridHelper: GridHelper;
  private _group: Group;

  constructor(canvas: HTMLCanvasElement) {
    if (!canvas) {
      throw new Error('canvas must not be null or undefined');
      return;
    }
    this._canvas = canvas;

    this._webglRenderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    this._webglRenderer.setPixelRatio(window.devicePixelRatio);
    this._webglRenderer.setSize(this._canvas.clientWidth, this._canvas.clientHeight);

    this._scene = new THREE.Scene();
    this._scene.background = new THREE.Color(0xdeebed);
    const pmremGenerator = new THREE.PMREMGenerator(this._webglRenderer);
    this._scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture;

    this._activeCamera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000,
    );
    this._activeCamera.position.set(0, 0, 500);
    this._activeControl = new OrbitControls(this._activeCamera, this._webglRenderer.domElement);

    this._group = new THREE.Group();
    this._scene.add(this._group);

    this._gridHelper = new THREE.GridHelper(160, 10);
    this._group.add(this._gridHelper);

    window.addEventListener('resize', this._onWindowResize);
    this._animate();
  }

  private _animate() {
    requestAnimationFrame(this._animate.bind(this));
    this._activeControl.update();
    this._render();
  }

  private _render() {
    this._webglRenderer.render(this._scene, this._activeCamera);
  }

  private _onWindowResize() {
    if (this._activeCamera instanceof THREE.PerspectiveCamera) {
      this._activeCamera.aspect = this._canvas.clientWidth / this._canvas.clientHeight;
      this._activeCamera.updateProjectionMatrix();
      this._webglRenderer.setSize(this._canvas.clientWidth, this._canvas.clientHeight);
    }
  }
}
export default ThreeScene;
