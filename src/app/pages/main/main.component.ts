import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { toJpeg } from 'html-to-image';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LucideAngularModule, ReactiveFormsModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @ViewChild('targetElement', { static: false }) targetElement!: ElementRef;

  salvarComoImagem(): void {
    const element = this.targetElement.nativeElement;

    toJpeg(element)
      .then((dataUrl: string) => {
        const link = document.createElement('a');
        link.download = 'captura.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('Erro ao gerar imagem:', error);
      });
  }

  form: FormGroup;
  components: Array<{ name: string, rank: String, time: String, image:  String }> = [];

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      name: [''],
      rank: [''],
      time: [''],
      image: ['']
    })
  }

  adicionar() {
    if (this.form.valid) {
      this.components.push({ ...this.form.value });
      this.form.reset(); // limpa os campos
    }
  }
}
