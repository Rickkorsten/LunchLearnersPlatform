import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { PostBookComponent } from '../../components/post-book/post-book.component';

interface Post {
  title: string;
  content: string;
}

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})

export class StoreComponent implements OnInit {


  postsCol: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;

  title: string;
  content: string;


  constructor(private afs: AngularFirestore ) {

  }

  ngOnInit() {
    this.postsCol = this.afs.collection('posts');
    this.posts = this.postsCol.valueChanges();
  }
}
