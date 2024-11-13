import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

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
  const uniqueId = `${data.title}-${uuidv4()}`;

  const document = {
    category: data.category,
    name: data.title,
    url: data.link,
    recommendedAge: data.ageCategory,
    id: data.id,
    createdAt: new Date().toISOString(),
  };

  // Використання setDoc з власним ID
  const docRef = await setDoc(doc(db, collectionName, uniqueId), document);
  return docRef;
};

export default addDocumentToCollection;
