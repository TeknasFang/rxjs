import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {pipe,delay,tap, retry, retryWhen, scan, fromEvent, debounceTime} from 'rxjs'
@Component({
  selector: 'app-fetcher',
  templateUrl: './fetcher.component.html',
  styleUrls: ['./fetcher.component.css']
})
export class FetcherComponent implements OnInit,AfterViewInit {
  fetching:boolean = false
  error:boolean = false
  @ViewChild('btn')  btn!:ElementRef

  
  constructor(private http:HttpClient) { }
  ngAfterViewInit(): void {
    let click = fromEvent(this.btn.nativeElement,'click')
    click.pipe(debounceTime(10000)).subscribe(res=>console.log(res))
    
  }
  ngOnInit(): void {
  }

  fetch(){
    this.http.get('https://learn-http-b7c37-default-rtdb.firebaseio.com/posts.json').pipe(tap(res=>{
      console.log('tap',res)
      this.error = false
      this.fetching = true
    }),
    // retry(2)
    retryWhen(err=>err.pipe(scan((retryAttempt)=>{
      if(retryAttempt>4){
        throw err;
      }else{
        retryAttempt = retryAttempt+1
      this.error = true
        console.log("attempt",retryAttempt)
        return retryAttempt
      }
    },0),delay(3000)))
    ,delay(1000)
    )
    .subscribe(res=>{
      console.log("from res",res)
      this.fetching = true
    },err=>{
      console.log(err)
      this.error = true
    },()=>{
      this.fetching = false
      this.error = false
    })
  }
}
