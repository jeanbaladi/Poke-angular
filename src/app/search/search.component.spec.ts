import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule } from '@angular/common/http/testing'
import {Pokemon} from '../interface/pokemon';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports :[
        HttpClientTestingModule
      ],
      declarations: [ SearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //variables 
  it('browserText initial value' , () => {
    expect(component.browserText).toEqual('')
  })
  it('pokemon array' , () => {
    const mock : Pokemon[] = [];
    expect(component.pokemons).toEqual(mock)
  })
});
