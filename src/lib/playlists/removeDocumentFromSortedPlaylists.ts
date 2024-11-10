import { deleteDoc, doc, getFirestore } from 'firebase/firestore';

const db = getFirestore();

async function removeDocumentFromSortedPlaylists(videoTitle: string) {
  try {
    await deleteDoc(doc(db, 'sortedPlaylists', videoTitle));
    console.log('Document successfully deleted!');
  } catch (error) {
    console.error('Error removing document: ', error);
  }
}

export default removeDocumentFromSortedPlaylists;
