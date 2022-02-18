import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClustersService } from 'src/app/services/clusters/clusters.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-cluster',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewServerComponent implements OnInit {

  clusterForm = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    token: new FormControl(''),
    type: new FormControl(''),
    version: new FormControl(''),
  });

  constructor(private route: Router, private clustersService: ClustersService) { }

  ngOnInit(): void {
  }

  postServer() {
    this.clustersService.postServer(this.clusterForm.value)
      .subscribe(() => {
        Swal.fire({
          title: 'New Server created',
          icon: 'success',
        }).then(() =>
          this.route.navigate(['clusters'])
        )
      })
  }

}
