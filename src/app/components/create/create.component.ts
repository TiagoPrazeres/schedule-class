import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  todayData: Date = new Date();

  public formulario: FormGroup = new FormGroup({
    'data': new FormControl({value: 'Nancy', disabled: true}, Validators.required),
    'nomeAluno': new FormControl(null, [Validators.required]),
    'hora': new FormControl(null, [Validators.required])
  })

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  constructor(private router: Router, private service: TodoService) { }

  ngOnInit(): void {
  }
  
  create(): void {
    
    if(this.formulario.status === 'INVALID') {
      this.formulario.markAllAsTouched()
    }else {
        this.formataData()
        this.service.create(this.todo).subscribe((resposta) => {
        this.service.message('Criado com sucesso')
        this.router.navigate([''])
      }, err => {
        this.service.message('Falhar ao criar')
        this.router.navigate([''])
        console.log(err)
      })
    }

  }

  cancel(): void {
    this.router.navigate([''])
  }

  formataData(): void {
    let data = new Date(this.todo.dataParaFinalizar)
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }

}
