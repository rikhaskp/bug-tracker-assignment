import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BugTrackerService } from '../bug-tracker.service';

@Component({
  selector: 'app-add-edit-bug',
  templateUrl: './add-edit-bug.component.html',
  styleUrls: ['./add-edit-bug.component.scss']
})
export class AddEditBugComponent {
  bugForm: FormGroup;
  bugDetails: any;
  pageTitle: any;
  submitOrUpdate: any;
  submitted = false;
  action: any;
  uploadedFiles: any[] = [];
  fileData: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private bugService: BugTrackerService,
    private router: Router,
    private snackBar: MatSnackBar,
    private el: ElementRef,
    private cd: ChangeDetectorRef

  ) {
    this.bugForm = this.fb.group({
      title: (['',
        Validators.compose([
          Validators.required,
        ])
      ]),
      description: (['',
        Validators.compose([
          Validators.required,
        ])
      ]),
      dueDate: (['',
        Validators.compose([
        ])
      ]),
      reporter: (['',
        Validators.compose([
        ])
      ]),
      project: (['',
        Validators.compose([
        ])
      ]),
      fileURL: (['',
        Validators.compose([
        ])
      ])
    });
  }

  ngOnInit() {
    this.action = this.activatedRoute.snapshot.params['action'];
    if (this.action === 'addBug') {
      this.pageTitle = 'Add Bug';
      this.submitOrUpdate = 'Submit';
    } else {
      this.pageTitle = 'Edit Bug';
      this.submitOrUpdate = 'Update';
      const id = localStorage.getItem('bugID');
      this.bugService.getBugDetails(id).subscribe(res => {
        this.bugDetails = res.bugs;
        this.bugForm.patchValue(this.bugDetails);
      });
    }
  }
  get f() { return this.bugForm.controls; }

  submit() {
    const bugData = new FormData();
    bugData.append('title', this.bugForm.value.title);
    bugData.append('description', this.bugForm.value.description);
    bugData.append('project', this.bugForm.value.project);
    bugData.append('dueDate', this.bugForm.value.dueDate);
    bugData.append('reporter', this.bugForm.value.dojreporter);
    bugData.append('fielURL', this.bugForm.value.fielURL);

    this.submitted = true;
    if (this.bugForm.invalid) {
      return;

    } else {
      if (this.action === 'addBug') {

        this.bugService.addBug(bugData).subscribe(res => {
          this.router.navigate(['/bugTracker']);
          this.snackBar.open(res.message, '', {
            duration: 5000,
          });
        }, (err: any)=> {
          this.snackBar.open(err.error.response.message, '', {
            duration: 5000,
          });
        });
      } else {
        const id = localStorage.getItem('bugID');
        this.bugService.editBug(id, bugData).subscribe(res => {
          this.snackBar.open(res.message, '', {
            duration: 2000,
          });
          this.router.navigate(['/bugTracker']);
        });
      }
    }
  }

  cancel() {
    this.router.navigate(['/bugTracker']);
  }
}
