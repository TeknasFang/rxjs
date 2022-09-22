import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Renderer2 } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  count!:number
  subscription!:Subscription
  @Output() newItemEvent = new EventEmitter<string>();

  @ViewChild('timer') timer!:ElementRef
  constructor(private renderer:Renderer2) { }

  ngOnInit(): void {
    
    let timer = interval(1000)
    const subscription = timer.subscribe(res=>{
      if((res+1)%2==0){
        this.renderer.setStyle(this.timer.nativeElement,'backgroundColor','rgb(211,211,211)')
      }
      if((res+1)%2!==0){
        this.renderer.setStyle(this.timer.nativeElement,'backgroundColor','white')
      }
      if(res+1>19){
        // console.log(this.timer.nativeElement)
        this.renderer.setStyle(this.timer.nativeElement,'backgroundColor','white')
        this.renderer.setStyle(this.timer.nativeElement,'color','white')
        subscription.unsubscribe()
      }
      // console.log(res+1)
      this.count = res+1
    })
  }

  onClick(){
    this.newItemEvent.emit("Button is Clicked ! ")
  }
}
