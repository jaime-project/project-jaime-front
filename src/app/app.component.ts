import { AfterViewInit, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  title = 'Jaime';
  isLoading = true;

  constructor(private tittleService: Title) {
    this.tittleService.setTitle($localize`${this.title}`)
  }

  ngAfterViewInit() {
    this.isLoading = false;
  }
}
