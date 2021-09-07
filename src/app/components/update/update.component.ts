import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  todayDate: Date = new Date()

  public formulario: FormGroup = new FormGroup({
    'data': new FormControl(null, [Validators.required]),
    'nomeAluno': new FormControl(null, [Validators.required]),
    'hora': new FormControl(null, [Validators.required])
  })

  todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  constructor(private router: Router, private service: TodoService, private activateRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.todo.id = this.activateRouter.snapshot.params.id;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.todo.id).subscribe((resposta) => {
      this.todo = resposta;
    })
  }

  update(): void {
    
    if(this.formulario.status === 'INVALID') {
      this.formulario.markAllAsTouched()
    }else {
        this.formataData();
        this.service.update(this.todo).subscribe((resposta) => {
        this.service.message('Atualizado com sucesso')
        this.router.navigate([''])
      }, err => {
        this.service.message('Falha ao atualizar')
        this.router.navigate([''])
      })
    }
  }

  cancel(): void {
    this.router.navigate(['']);
  }

  formataData(): void {
    let data = new Date(this.todo.dataParaFinalizar)
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }

}
