import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable  } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject, tap } from 'rxjs';
import { Pokemon } from './interface/pokemon';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  apiUrl : string = 'https://bp-pokemons.herokuapp.com';
  modalIsOpen : number = 0;
  modalIsOpen$ : Subject<number> = new Subject();
  allPokemons: Pokemon[] = [];

  constructor( private http : HttpClient) {}

  // get all pokemons 
  getAllPokemons() : Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(`${this.apiUrl}/?idAuthor=1`)
      .pipe(map(res => this.allPokemons = res)); 
  }
  //edit pokemon 
  editPokemon(pokemon : Pokemon , idThisPokemon : number) : Observable<Pokemon> {
    let find = this.allPokemons.find(call => call.id == idThisPokemon)
    if(find){
      pokemon.id = find.id;
      pokemon.idAuthor = 1;
    }
    return this.http.put<Pokemon>(`${this.apiUrl}/${pokemon.id}` , pokemon );
  }
  //add pokemon 
  addPokemon(pokemon : Pokemon) : Observable<Pokemon>{
    let getId = this.allPokemons.map(element => element.id).reduce((acc ,crr) => { return acc < crr ? crr : acc},0);
    pokemon.id = getId + 1;
    this.allPokemons.push(pokemon);
    return this.http.post<Pokemon>(`${this.apiUrl}/?idAuthor=1` , pokemon);
  }
  //delete pokemon 
  deletePokemon(id : number) : Observable<Pokemon> {
    let index = this.allPokemons.findIndex(x => x.id == id);
    this.allPokemons.splice(index , 1);
    return this.http.delete<Pokemon>(`${this.apiUrl}/${id}`);
  }
  //Get only a pokemon  
  getPokemon( id : number) : Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}` );
  }
  //Modal
  setModal(id : number){
    this.modalIsOpen = id;
    this.modalIsOpen$.next(this.modalIsOpen);
  }
  getModal() : Observable<number> {
    return this.modalIsOpen$.asObservable();
  }
  set setArrayPokemons(pokemon : Pokemon[]){
    this.allPokemons = pokemon;
  }
  get arrayPokemons(){
    return this.allPokemons;
  }

}
