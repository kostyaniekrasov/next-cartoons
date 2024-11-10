import AvatarData from './AvatarData';

interface UpdateUserData {
  name?: string;
  age?: number;
  avatar?: AvatarData;
  showSearch?: boolean;
}

export default UpdateUserData;
