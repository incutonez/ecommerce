import { UserEntity } from "src/models/user.entity";

export class ReviewEntity {
  id?: string;
  title: string;
  description: string;
  rating: number;
  createdDate: number;
  createdBy: UserEntity;
}
