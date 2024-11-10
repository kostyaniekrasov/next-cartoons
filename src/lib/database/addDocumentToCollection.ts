import { addDoc, collection } from 'firebase/firestore';

import { db } from './firebase';

interface DocumentData {
  category: string;
  title: string;
  link: string;
  id: string;
  ageCategory: string;
  type: 'videos' | 'playlists';
}

const addDocumentToCollection = async (data: DocumentData) => {
  const collectionName = data.type === 'playlists' ? 'playlists' : 'videos';
  const document = {
    category: data.category,
    name: data.title,
    url: data.link,
    recommendedAge: data.ageCategory,
    id: data.id,
  };

  const docRef = await addDoc(collection(db, collectionName), document);
  return docRef;
};

export default addDocumentToCollection;
