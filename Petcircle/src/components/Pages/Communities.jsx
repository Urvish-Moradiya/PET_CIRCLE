import React, { useState, useEffect } from "react";

const Communities = () => {
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [showFeed, setShowFeed] = useState(false);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [communities, setCommunities] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newPostId, setNewPostId] = useState(3); // Start after sample data

  const userId = "mockUser123"; // Replace with real auth in production

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/communities");
      if (!response.ok) throw new Error("Failed to fetch communities");
      const data = await response.json();
      setCommunities(data);
      setJoinedCommunities(
        data.filter((c) => c.joinedUsers.includes(userId)).map((c) => c.id)
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommunityPosts = async (communityId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/communities/${communityId}/posts`
      );
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setCommunityPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleJoin = async (communityId) => {
    if (!joinedCommunities.includes(communityId)) {
      try {
        const response = await fetch(
          `http://localhost:5000/communities/${communityId}/join`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          }
        );
        if (!response.ok) throw new Error("Failed to join community");
        const updatedCommunity = await response.json();
        setJoinedCommunities([...joinedCommunities, communityId]);
        setCommunities(
          communities.map((c) => (c.id === communityId ? updatedCommunity : c))
        );
      } catch (err) {
        setError(err.message);
        return;
      }
    }
    setSelectedCommunity(communityId);
    setShowFeed(true);
    fetchCommunityPosts(communityId);
  };

  const leaveCommunity = async (communityId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/communities/${communityId}/leave`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );
      if (!response.ok) throw new Error("Failed to leave community");
      const updatedCommunity = await response.json();
      setJoinedCommunities(joinedCommunities.filter((id) => id !== communityId));
      setCommunities(
        communities.map((c) => (c.id === communityId ? updatedCommunity : c))
      );
      setShowFeed(false);
      setSelectedCommunity(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const viewCommunity = (communityId) => {
    setSelectedCommunity(communityId);
    setShowFeed(true);
    fetchCommunityPosts(communityId);
  };

  const handleBack = () => {
    setShowFeed(false);
    setSelectedCommunity(null);
    setCommunityPosts([]);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !selectedCommunity) return;
  
    try {
      const response = await fetch(
        `http://localhost:5000/communities/${selectedCommunity}/posts`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: newPost.trim(), // No id sent
            author: "Current User",
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create post");
      }
      const newPostObj = await response.json();
      setCommunityPosts([newPostObj, ...communityPosts]);
      setNewPost("");
  
      const communityResponse = await fetch(
        `http://localhost:5000/communities/${selectedCommunity}`
      );
      const updatedCommunity = await communityResponse.json();
      setCommunities(
        communities.map((c) => (c.id === selectedCommunity ? updatedCommunity : c))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (showFeed && selectedCommunity) {
    const community = communities.find((c) => c.id === selectedCommunity);
    const communityFeed = communityPosts.filter(
      (post) => post.communityId === selectedCommunity
    );

    return (
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto mt-10 px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={handleBack}
                className="mr-4 text-gray-600 hover:text-gray-900 cursor-pointer"
                aria-label="Go back"
              >
                <i className="fas fa-arrow-left text-xl"></i>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {community && community.title}
                </h1>
                <p className="text-sm text-gray-600">
                  {community && community.members.toLocaleString()} members •{" "}
                  {community && community.posts} posts
                </p>
              </div>
            </div>
            <button
              onClick={() => leaveCommunity(selectedCommunity)}
              className="rounded-md px-4 py-2 bg-red-600 text-white hover:bg-red-700"
            >
              <span className="flex items-center">
                <i className="fas fa-sign-out-alt mr-2"></i>
                Leave Community
              </span>
            </button>
          </div>
        </div>

        <main className="max-w-3xl mx-auto px-4 py-8">
          <form onSubmit={handlePostSubmit} className="mb-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <label
                htmlFor="post-content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Share your thoughts about {community && community.title}
              </label>
              <textarea
                id="post-content"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={
                  community
                    ? `Share your ${community.title.toLowerCase()} related tips...`
                    : "Share your thoughts..."
                }
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                required
              />
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="rounded-md px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                  disabled={!newPost.trim()}
                >
                  Post Message
                </button>
              </div>
            </div>
          </form>

          <div className="space-y-6">
            {communityFeed.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {post.author}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(post.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-800 whitespace-pre-wrap">
                  {post.content}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto mt-15 px-4">
        <h1 className="text-3xl font-bold text-gray-900">Pet Communities</h1>
        <p className="mt-2 text-lg text-gray-600">
          Join communities that match your interests and connect with fellow
          pet lovers.
        </p>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <div
              key={community.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={community.image || "https://via.placeholder.com/150"}
                  alt={community.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {community.title}
                </h3>
                <p className="mt-2 text-gray-600">{community.description}</p>
                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <i className="fas fa-users mr-2"></i>
                    <span>{community.members.toLocaleString()} members</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-comment-alt mr-2"></i>
                    <span>{community.posts.toLocaleString()} posts</span>
                  </div>
                </div>
                <div className="mt-6">
                  {!joinedCommunities.includes(community.id) ? (
                    <button
                      onClick={() => toggleJoin(community.id)}
                      className="w-full !rounded-button whitespace-nowrap py-2 px-4 text-center font-medium cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      <span className="flex items-center justify-center">
                        <i className="fas fa-plus mr-2"></i>
                        Join Community
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={() => viewCommunity(community.id)}
                      className="w-full !rounded-button whitespace-nowrap py-2 px-4 text-center font-medium cursor-pointer bg-green-600 text-white hover:bg-green-700"
                    >
                      <span className="flex items-center justify-center">
                        <i className="fas fa-comments mr-2"></i>
                        View Community Messages
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Communities;