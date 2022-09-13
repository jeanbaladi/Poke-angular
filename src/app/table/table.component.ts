import { Component, OnInit , OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { HttpRequestsService } from '../http-requests.service';
import { Pokemon } from '../interface/pokemon';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit , OnDestroy {
  subscriptions : Subscription[] = [];
  allPokemons : Pokemon[] = [];
  id : number = 0;
  search : string = '';
  constructor(public service : HttpRequestsService) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.service.getAllPokemons()
        .pipe(
          tap(res => this.allPokemons = res)
        )
      .subscribe() ,
    )    
  }

  brokenImg(evt : Event) : string {
    return (evt.target as HTMLImageElement).src = '../../assets/img/notfound.png';
  }

  searchResults(value : string){
    this.search = value;
    if(this.search.length > 2){
      let filter = this.service.arrayPokemons.filter(element => element.name.substring(0 , this.search.length).toLocaleLowerCase() == this.search.toLocaleLowerCase());
      this.service.setArrayPokemons = filter;
    }else if(this.search.length === 1){
      this.allPokemons = [...this.service.arrayPokemons];
    }
    else {
      this.service.setArrayPokemons = this.allPokemons;
    }
  }

  addItem(value: number) : number {
   return this.id = value;
  }

  editPokemon(id : number) : void{
    this.subscriptions.push(
      this.service.getPokemon(id).subscribe() , 
      this.service.getModal().subscribe(res => this.id = res)
    )
    this.service.setModal(id);
  }
  deletePokemon(id : number) : void{
    this.service.deletePokemon(id).subscribe();
    setTimeout(() => {
      this.service.setArrayPokemons = this.service.arrayPokemons;
    }, 200)
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(el => el.unsubscribe());
  }

}
