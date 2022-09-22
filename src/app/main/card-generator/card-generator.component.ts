import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent,Subscription,timer } from 'rxjs';
@Component({
  selector: 'app-card-generator',
  templateUrl: './card-generator.component.html',
  styleUrls: ['./card-generator.component.css']
})
export class CardGeneratorComponent implements OnInit,AfterViewInit {
  @ViewChild('addCardBtn') addCardBtn!:ElementRef
  count = 0;
  timer_subcription !: Subscription
  constructor() { }
  
  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    fromEvent(this.addCardBtn.nativeElement,'click').subscribe(res=>{
      this.generateCard()

    })
  }

  generateCard(){
    let element = document.createElement('div')
    element.style.transition= 'all 1s ease,height 0s,width 0s,border 0s'
    element.style.backgroundColor= 'white';
    element.style.borderRadius= '6px';
    element.style.margin= '0.4rem 0rem'
    element.style.color= 'white';
    element.style.width = '100px'
    element.style.height = '60px'
    element.style.padding = '10px'
    this.count++
    element.innerHTML = `Card ${this.count}`
    document.getElementById('card-wrapper')?.appendChild(element)

    let timer_ = timer(50,1000)
    let timer_subscription = timer_.subscribe(res=>{
    element.style.border='1px solid black';
    element.style.backgroundColor= 'black';
    element.style.color= 'white';
      if(res>1){
    element.style.backgroundColor= 'white';
    element.style.color= 'black';
        timer_subscription.unsubscribe()
      }
    })

  }
}
