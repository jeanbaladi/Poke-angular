import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule } from '@angular/common/http/testing'

import { AddFormComponent } from './add-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';


describe('AddFormComponent', () => {
  let component: AddFormComponent;
  let fixture: ComponentFixture<AddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ AddFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //form testing
  it('validated form' , () => {
    const mock = {
      name : 'pikachu',
      image : 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png',
      attack : 10,
      defense : 30,
      hp : 100,
      type : 'trueno',
      idAuthor : 1,
      id : 3425,
    }
    let name = component.form.controls['name']
    let image = component.form.controls['image']
    let attack = component.form.controls['attack']
    let defense = component.form.controls['defense']
    let hp = component.form.controls['hp']
    let type = component.form.controls['type']
    let idAuthor = component.form.controls['idAuthor']
    let id = component.form.controls['id']
    name.setValue(mock.name)
    image.setValue(mock.image)
    attack.setValue(mock.attack)
    defense.setValue(mock.defense)
    hp.setValue(mock.hp)
    type.setValue(mock.type)
    idAuthor.setValue(mock.idAuthor)
    id.setValue(mock.id)
    expect(component.form.valid).toBeTrue();
  })
});
