import { Component, OnInit , OnDestroy} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounce, interval, scan, Subscription } from 'rxjs';
import { HttpRequestsService } from '../http-requests.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit , OnDestroy{
  form! : FormGroup;
  subscription : Subscription[] = [];
  constructor(private service : HttpRequestsService) {
    this.form = new FormGroup({
      name : new FormControl(),
      image : new FormControl(),
      attack : new FormControl(),
      defense : new FormControl(),
      hp : new FormControl(100),
      type : new FormControl('...'),
      idAuthor : new FormControl(1),
      id : new FormControl(),
    })
   }


  ngOnInit(): void {
  }

  addPokemon() : void {
    if(this.form.valid){
      this.subscription.push(
        this.service.addPokemon(this.form.value)
        .pipe(
          scan(i => ++i, 1),
          debounce(i => interval(200 * i))
        )
        .subscribe() ,
        )
      this.form.reset();
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(subs => subs.unsubscribe());
  }

}
