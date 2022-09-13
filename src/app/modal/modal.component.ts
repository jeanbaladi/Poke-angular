import { Component, OnInit , OnDestroy, Input , OnChanges, SimpleChanges ,  Output, EventEmitter, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounce, interval, pipe, scan,  Subscription, tap } from 'rxjs';
import { HttpRequestsService } from '../http-requests.service';
import { Pokemon } from '../interface/pokemon';

const INITIAL_STATE = {
  name : "",
  image : "",
  attack : 0,
  defense : 0,
  hp : 0,
  type : "",
  idAuthor : 0,
  id : 0,
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})


export class ModalComponent implements OnInit ,  OnDestroy{
  form : FormGroup;
  pokemon : Pokemon = INITIAL_STATE;
  subscriptions : Subscription[] = [];
  @Input() id = 0;
  @Output() newItemEvent = new EventEmitter<number>();
  modalIsOpen : number = 0;
  rangeValues = {attack : 50 , defense : 50, hp : 50};
  constructor(private service : HttpRequestsService) { 
    this.form = new FormGroup({
      name : new FormControl(),
      image : new FormControl(),
      attack : new FormControl(),
      defense : new FormControl(),
      type : new FormControl(),
      hp : new FormControl(),
      idAuthor : new FormControl(1),
      id : new FormControl(this.id),
    })
  }

  ngOnInit(): void {
    this.form.value.id = this.id;
    let find = this.service.arrayPokemons.find(x => x.id == this.id);
    if(find){
      this.pokemon = find;
    }
  }

  closeModal() {
    this.newItemEvent.emit(0);
  }

  onSubmit(){
    if(this.form.valid){
      this.service.editPokemon(this.form.value , this.id)
      .pipe(
        scan(i => ++i, 1),
        debounce(i => interval(200 * i))
      )
      .subscribe();
      setTimeout(()=> {
        this.service.getAllPokemons().subscribe();
        this.form.reset();
      }, 200)
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }

}
