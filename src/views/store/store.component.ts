import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


interface Post {
  title: string;
  content: string;
  videoURL: string;
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
  videoURL: any;

  user: any;


  constructor(private db: AngularFirestore ) {
  }

  ngOnInit() {
    this.postsCol = this.db.collection('posts');
    this.posts = this.postsCol.valueChanges();
  }

  // downloadImage(imageURL:string){
  //   const ref = this.storage.ref('test/1519578506282_kaftceline1.png');
  //  // console.log(ref.getDownloadURL())
  //   return
  // }
}
