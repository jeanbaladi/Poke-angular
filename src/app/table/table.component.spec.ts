import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule } from '@angular/common/http/testing'
import { Pokemon} from '../interface/pokemon'
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations: [ TableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //variables
  it('array of subscriptions' , () => {
    const mock : Pokemon[] = []
    expect(component.allPokemons).toEqual(mock)
  })
  it('element id' , () => {
    expect(component.id).toEqual(0)
  })
  it('initial search text' , () => {
    expect(component.search).toEqual('')
  })
  
});


