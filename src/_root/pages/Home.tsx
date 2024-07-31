// @/_root/pages/Home.tsx

import { Loader, PostCard, UserCard } from "@/components/shared";
import ObjectiveCard from '@/components/shared/ObjectiveCard';
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";
import { Models } from "appwrite";

const Home = () => {
  const { data: posts, isLoading: isPostLoading, isError: isErrorPosts } = useGetRecentPosts();
  const { data: creators, isLoading: isUserLoading, isError: isErrorCreators } = useGetUsers(10);

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1 p-4">
        <div className="flex-1 bg-green-50 p-6 rounded-lg">
          <p className="body-medium text-red-600">Something went wrong while fetching posts.</p>
        </div>
        <div className="w-1/4 bg-green-50 p-6 rounded-lg ml-4">
          <p className="body-medium text-red-600">Something went wrong while fetching creators.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 p-4 bg-green-50">
      <div className="flex-1 mr-4 bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-green-900">Home</h2>
          <img
            src="public/assets/images/TREE_SIGNUP.jpg" // Path to your image
            alt="Description of the photo"
            className="mx-auto mt-4 max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        {/* ObjectiveCard Component */}
        <ObjectiveCard dailyObjective={3258} monthlyObjective={1000000} yearlyObjective={15100000} />
        {isPostLoading && !posts ? (
          <Loader />
        ) : (
          <ul className="flex flex-col gap-6">
            {posts?.documents.map((post: Models.Document) => (
              <li key={post.$id} className="flex justify-center">
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="w-1/4 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-green-900 mb-4">Top Creators</h3>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid grid-cols-1 gap-4">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
