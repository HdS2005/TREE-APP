import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link
      to={`/profile/${user.$id}`}
      className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-16 h-16 mb-3"
      />

      <div className="flex flex-col items-center">
        <p className="text-base font-medium text-gray-900 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="text-sm text-gray-600 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button
        type="button"
        size="sm"
        className="mt-3 shad-button_primary w-full"
      >
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
