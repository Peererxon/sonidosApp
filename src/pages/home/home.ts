import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AnimalProvider } from '../../providers/animal/animal';
import { Animal } from '../../clases/Animal';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  animales:Animal[] = [];
  audio:any;
  animalReproduciendo:any;
  ordenando:boolean = false;

  constructor(public navCtrl: NavController,public _animales:AnimalProvider) {
  this.animales = _animales.ANIMALES.slice(0);
  this.audio    = new Audio;
  }

   private doRefresh(refresh) {
    console.log('Begin async operation');

    setTimeout(()=>{
      console.log("Termino el refresher");
      this.animales = this._animales.ANIMALES.slice(0);
      refresh.complete();
    },1200)
  }

  public reproducir(animal:Animal){

    this.pausar(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }

    this.audio     = new Audio;
    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();
    animal.reproduciendo = true;

    this.animalReproduciendo = setTimeout( function() {
      animal.reproduciendo = false;
    },animal.duracion * 1000)

    
  }

  private pausar(animalP:Animal){
  	clearTimeout(this.animalReproduciendo);
    console.log(this.audio);
  	this.audio.pause();
  	this.audio.currentTime = 0;

    for ( let animal of this.animales) {
     if (animal.nombre != animalP.nombre) {
       animal.reproduciendo = false ;
     }
    }

  }

  private eliminarAnimal(indice:number){
    this.animales.splice(indice,1);
  }

  private ordenar(){
    if (this.ordenando) {
     this.ordenando = false;
   }else
     this.ordenando = true;
  }

}
