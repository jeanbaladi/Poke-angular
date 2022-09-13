import { Component, OnInit, OnDestroy, Output , EventEmitter} from '@angular/core';
import {  Subscription, tap } from 'rxjs';
import { HttpRequestsService } from '../http-requests.service';
import { Pokemon } from '../interface/pokemon';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit , OnDestroy  {
  browserText : string = '';
  subscriptions : Subscription[] = [];
  pokemons : Pokemon[] = [];
  @Output() newItemEvent = new EventEmitter<string>();
  constructor(private service : HttpRequestsService) { }


  ngOnInit(): void {
    this.subscriptions.push(
      this.service.getAllPokemons()
        .pipe(tap(res => this.pokemons = res))
        .subscribe() 
        )
  }

  searchHandler(){
    this.newItemEvent.emit(this.browserText);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
  }
}
