import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild ,AfterViewInit} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatar',
  standalone:true,
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  imports:[CommonModule],
})
export class AvatarComponent  implements AfterViewInit {
@ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef<HTMLDivElement>;

scene: THREE.Scene;
camera: THREE.PerspectiveCamera;
renderer: THREE.WebGLRenderer;
controls: OrbitControls | undefined;
mixer: THREE.AnimationMixer | undefined;
actions: THREE.AnimationAction[] = [];
clock: THREE.Clock;
model: THREE.Object3D | undefined;
isLoading: boolean = true;
progress: number = 0;
moveSpeed: number = 0.1;
keys: { [key: string]: boolean } = {};
isAnimationPaused: boolean = false;


  constructor(private router: Router) {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb); // Color del cielo (celeste claro)
    this.camera = new THREE.PerspectiveCamera(1, window.innerWidth / window.innerHeight, 20, 8000);
    this.renderer = new THREE.WebGLRenderer();
    this.clock = new THREE.Clock(); 
    
   }

  ngAfterViewInit():void {
    this.renderer.setSize(window.innerWidth,window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 1.20, 0);
    this.controls.update();
    this.renderModel();
    this.animate();
  }

  renderModel():void{
  const loader = new GLTFLoader();
  loader.load('assets/train/train.glb',
  (glb)=>{
    this.model = glb.scene;
    if (this.model) {
      for (const property in this.model) {
        console.log(property);
      }
    }
    this.scene.add(this.model);
    this.mixer = new THREE.AnimationMixer(this.model);
    glb.animations.forEach((clip) => {
      const action = this.mixer!.clipAction(clip);
      action.play();
      this.actions.push(action);
    });
    glb.scene.traverse((node) => {
      if (node instanceof THREE.Light) {
        console.log(node.name); // Mostrar el nombre de la luz para identificarlo
        if (node.name === 'Light') { // Reemplaza 'nombre_de_la_luz' con el nombre real de tu luz
          const directionalLight = node as THREE.DirectionalLight;
          // Modificar la intensidad de la luz
          directionalLight.intensity = 1900.0;
          directionalLight.position.set(10, 20, 30)
        }
      }
    });
    this.isLoading = false;
  },
  (xhr)=>{
    this.progress = (xhr.loaded / xhr.total) * 100;
    console.log(xhr.loaded/xhr.total*100 + '%loaded');
  },
  (error)=>{
    console.error('Error al cargar el modelo 3D', error);
    this.isLoading = false;
  })
  this.camera.position.z = 100.61808;
  this.camera.position.x = 10.011708 ;
  this.camera.position.y = 43.02367 ;
  }
 
  animate(): void {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    if (this.mixer) {
        if (!this.isAnimationPaused) {
            this.mixer.update(delta);
        }
    }

    if (this.keys['ArrowRight']) {
        if (this.mixer && !this.isAnimationPaused) {
            this.actions.forEach(action => action.time += this.moveSpeed);
        }
    }
    if (this.keys['ArrowLeft']) {
        if (this.mixer && !this.isAnimationPaused) {
            this.actions.forEach(action => action.time -= this.moveSpeed);
        }
    }

    this.controls!.update();
    this.renderer.render(this.scene, this.camera);
}



  saludar(): void {
    const mensaje = new SpeechSynthesisUtterance('Hola, soy tu asistente virtual, muy pronto trabajaremos juntos');
    window.speechSynthesis.speak(mensaje);
  }
  buscar(): void {
    // Configurar isLoading en true para mostrar la barra de progreso
    this.isLoading = true;

    // Simular un tiempo de espera de 3 segundos antes de ejecutar la acción de navegación
    
      const mensaje = new SpeechSynthesisUtterance('Ok, vamos a buscar un jugador');
      window.speechSynthesis.speak(mensaje);

      // Navegar a la ruta '/search'
      this.router.navigate(['/search']);
    ;
  }
  stopAnimation(): void {
    this.actions.forEach(action => action.stop());
    this.isAnimationPaused = true;

  }
}
