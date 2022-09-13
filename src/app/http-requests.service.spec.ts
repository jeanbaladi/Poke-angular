import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule } from '@angular/common/http/testing'
import { HttpRequestsService } from './http-requests.service';
import { of } from 'rxjs';
import {Pokemon } from './interface/pokemon'
describe('HttpRequestsService', () => {
  let service: HttpRequestsService;
  let httpClientSpy : {get: jasmine.Spy , post: jasmine.Spy , put: jasmine.Spy , delete : jasmine.Spy}

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put' , 'delete']);
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    // service = TestBed.inject(HttpRequestsService);
    service = new HttpRequestsService(httpClientSpy as any)
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // GET testing
  it('return an object (GET)', (done: DoneFn) => {
    const responseMockup : Pokemon[] = [{
      name : 'pikachu',
      image : 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png',
      attack : 10,
      defense : 30,
      hp : 100,
      type : '...',
      idAuthor : 1,
      id : 3425,
    }]
    httpClientSpy.get.and.returnValue(of(responseMockup));
    service.getAllPokemons()
      .subscribe(res => {
        expect(res).toEqual(responseMockup)
        done()
    });
  })
  //GET only a pokemon
  it('return an object (GET)' , (done : DoneFn) => {
    const responseMockup : Pokemon = {
      name : 'pikachu',
      image : 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png',
      attack : 10,
      defense : 30,
      hp : 100,
      type : '...',
      idAuthor : 1,
      id : 3425,
    }
    httpClientSpy.get.and.returnValue(of(responseMockup));
    service.getPokemon(3425)
      .subscribe(res => {
        expect(res).toEqual(responseMockup)
        done()
      })
  })
  //DELETE testing
  it('return an object (DELETE)' , (done : DoneFn) => {
    const responseMockup : Pokemon = {
      name : 'pikachu',
      image : 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png',
      attack : 10,
      defense : 30,
      hp : 100,
      type : '...',
      idAuthor : 1,
      id : 3425,
    }
    httpClientSpy.delete.and.returnValue(of(responseMockup));
    service.deletePokemon(3425)
      .subscribe(res => {
        expect(res).toEqual(responseMockup)
        done()
      })
  })
  //PUT testing
  it('return an object (PUT)' , (done: DoneFn) => {
    const shippingMockup : Pokemon = {
      name : 'pikachu',
      image : 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png',
      attack : 10,
      defense : 30,
      hp : 100,
      type : '...',
      idAuthor : 1,
      id : 3425,
    };
    const responseMockup : Pokemon = {
      name : 'pikachu',
      image : 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png',
      attack : 10,
      defense : 30,
      hp : 100,
      type : '...',
      idAuthor : 1,
      id : 3425,
    }
    httpClientSpy.put.and.returnValue(of(responseMockup));
    service.editPokemon(shippingMockup , 3425)
      .subscribe(res => {
        expect(res).toEqual(responseMockup)
        done()
      })
  })
  // POST testing 
  it('return an object (POST)', (done : DoneFn) => {
    const shippingMockup : Pokemon = {
        name : 'pikachu',
        image : 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png',
        attack : 10,
        defense : 30,
        hp : 100,
        type : '...',
        idAuthor : 1,
        id : 3425,
    } 
    const responseMockup : Pokemon = {
      name : 'pikachu',
      image : 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png',
      attack : 10,
      defense : 30,
      hp : 100,
      type : '...',
      idAuthor : 1,
      id : 3425,
    }
    httpClientSpy.post.and.returnValue(of(responseMockup));
    service.addPokemon(shippingMockup)
      .subscribe(res => {
        expect(res).toEqual(responseMockup)
        done()
      });
  });
});
