import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BugTrackerService } from './bug-tracker.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service'
import {BsModalService} from 'ngx-bootstrap/modal'
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { AccordionConfig } from 'ngx-bootstrap/accordion';
export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true });
}

@Component({
  selector: 'app-bug-tracker',
  templateUrl: './bug-tracker.component.html',
  styleUrls: ['./bug-tracker.component.scss'],
  providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }]
})
export class BugTrackerComponent implements OnInit{
  p:any
  dataSource: any;
  isModalOpen = false;
  errorOnFetchData = false;
  bugDetailsSet: any;
  noData = false;
  modalRef: BsModalRef | any;
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private bugTrackerService: BugTrackerService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.getAllBugs();
  }

  addBug() {
    this.router.navigate(['/bugTracker/addBug']);
  }

  getAllBugs() {
    this.bugTrackerService.getAllBugs().subscribe(res => {
      if (res.bugs.length !== 0) {
        this.dataSource = res.bugs.reverse();
      } else {
        this.noData = true;
      }
    }, err => {
      
      this.errorOnFetchData = true;
    });
  }

  openModal(template: TemplateRef<any>, id: any) {
    this.modalRef = this.modalService.show(template,{
      class: 'modal-dialog-centered' 
    });
    localStorage.setItem('bugID', id);
  }

  openModalWithClass(template: TemplateRef<any>, id:any) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );

    this.bugTrackerService.getBugDetails(id).subscribe(res => {
      this.bugDetailsSet = res.bugs;
    });

  }

  editBugPage(id:any) {
    localStorage.setItem('bugID', id);
    this.router.navigate(['/bugTracker/editBug']);
  }

  deleteBug(id: any) {
    this.bugTrackerService.deleteBug(id).subscribe(res => {
      this.modalRef.hide();
      this.snackBar.open(res.message, '', {
        duration: 2000,
      });
      this.getAllBugs();
    });
  }

}
