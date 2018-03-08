import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Component({
  selector: 'video-dropzone',
  templateUrl: './video-dropzone.component.html',
  styleUrls: ['./video-dropzone.component.scss']
})
export class VideoDropzoneComponent implements OnInit {
  @Input() hero: string;
  @Input() functie: any;

  uploadTask: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  file;
  fileName: string;

  title: string;
  content: string;
  path: string;


  constructor(private db: AngularFirestore, private storage: AngularFireStorage) {
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  addPost() {

    this.path = `test/${new Date().getTime()}_${this.file.name}`;

    // The main task
    this.uploadTask = this.storage.upload(this.path, this.file)

    // Progress monitoring
    this.percentage = this.uploadTask.percentageChanges();
    this.snapshot = this.uploadTask.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          this.db.collection('posts').add({ 'title': this.title, 'content': this.content, 'videoURL': this.path });
        }
      })
    )

  }

  startUpload(event: FileList) {
    this.file = event.item(0)
    this.fileName = this.file.name;

    // validation
    if (this.file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }


  ngOnInit() {
    console.log(this.hero)
    this.functie(this.hero)
  }
}
