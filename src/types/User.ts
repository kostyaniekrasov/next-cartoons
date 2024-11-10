import AvatarData from './AvatarData';
import ContinueWatching from './ContinueWatching';
import { Playlist } from './VideoData';

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  biggerKid: boolean;
  littleChild: boolean;
  watchLater: Playlist[];
  continueWatching: ContinueWatching[];
  role: string;
  avatar?: AvatarData;
  showSearch: boolean;
}

export default User;
