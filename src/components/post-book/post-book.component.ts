import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'post-book',
  templateUrl: './post-book.component.html',
  styleUrls: ['./post-book.component.scss']
})
export class PostBookComponent implements OnInit {

  uploadTask: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;

  title: string;
  content: string;


  constructor(private afs: AngularFirestore, private storage: AngularFireStorage ) {

  }
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  addPost() {
    // if (!this.video) return alert('no video selected');
    this.afs.collection('posts').add({ 'title': this.title, 'content': this.content, 'videoURL': 'url' });
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.uploadTask = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.uploadTask.percentageChanges();
    this.snapshot   = this.uploadTask.snapshotChanges()

    // The file's download URL
    this.downloadURL = this.uploadTask.downloadURL();
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  ngOnInit() {
  }
}
