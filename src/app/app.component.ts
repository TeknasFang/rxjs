import { Component, OnInit } from '@angular/core';
import { FormRecord } from '@angular/forms';
import {filter, from, interval, map, merge, of, tap,take, concat} from 'rxjs'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'appRxjs';
  studentData = [{name:'john',id:1,status:'pass'},
  {name:'marcos',id:2,status:'fail'},
  {name:'luffy',id:3,status:'fail'},
  {name:'wick',id:4,status:'pass'},
]
  ngOnInit(): void {

    // use of filter operator

    let passoutStudentList = this.studentData.filter(info=>(info.status!=='fail'))
    console.log("List of passed student :-",passoutStudentList)

   
    //use of map operator

    this.studentData.filter(info=>(info.status=='fail')).map(info=>(info.status='failed'))
    console.log("updatedList",this.studentData)


    //use of 'from' operator

    let individualStudent = from(this.studentData).subscribe(res=>{
      console.log("individualStudent = ",res)
    })

    
    //use of 'of' operator
        //emits argument one by one
    let array = of('alpha','beta','gama').subscribe(res=>console.log(res,"  ...emitted using 'of' operator"))


    //use of merge & concat operator
    
const first = interval(1500).pipe(tap(res=>console.log("first")),take(3));
const second = interval(1200).pipe(tap(res=>console.log("second")),take(3));
const third = interval(700).pipe(tap(res=>console.log("third")),take(3));
const fourth = interval(500).pipe(tap(res=>console.log("fourth")),take(3));

const merged = merge(first,second,third,fourth)
  //uncomment below line to see results in console
  // merged.subscribe(res=>console.log('merged : ',res))

const concated = concat(first,second,third,fourth)
  //uncomment below line to see results in console
  // concated.subscribe(res=>console.log('concated : ',res))
  }

  catchEvent(event:string){
      console.log("Emitted Event from header.component.ts :",event)
  }

}
