

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Communities = () => {
  const { user, joinedCommunities, setJoinedCommunities } = useAuth(); const navigate = useNavigate();
  const [communities, setCommunities] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFeed, setShowFeed] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  useEffect(() => {
    fetchCommunities();
    // Load joined communities from localStorage
    const storedJoined = JSON.parse(localStorage.getItem("joinedCommunities") || "[]");
    setJoinedCommunities(storedJoined);
  }, []);

  const fetchCommunities = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      console.log("fetchCommunities - Token:", token); // Debug
      const response = await fetch("http://localhost:5000/api/communities", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch communities: ${response.status}`);
      }
      const data = await response.json();
      console.log("fetchCommunities - Communities:", data); // Debug
      setCommunities(data);
    } catch (err) {
      setError(err.message);
      console.error("fetchCommunities - Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCommunityPosts = async (communityId) => {
    setLoading(true);
    try {
      console.log("fetchCommunityPosts - Community ID:", communityId); // Debug
      const response = await fetch(
        `http://localhost:5000/api/communities/${communityId}/posts`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }
      const data = await response.json();
      setCommunityPosts(data);
    } catch (err) {
      setError(err.message);
      console.error("fetchCommunityPosts - Error:", err);
    } finally {
      setLoading(false);
    }
  };
  const toggleJoin = async (communityId) => {
    if (!user) {
      setError('You must be logged in to join a community.');
      navigate('/login');
      return;
    }

    try {
      console.log('toggleJoin - Joining community ID:', communityId);
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Authentication token not found.');
      }
      const response = await fetch(
        `http://localhost:5000/api/communities/${communityId}/join`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          `Failed to join community: ${response.status} ${data.error || response.statusText}`
        );
      }
      const updatedCommunity = data;
      const newJoined = [...joinedCommunities, communityId];
      setJoinedCommunities(newJoined);
      localStorage.setItem('joinedCommunities', JSON.stringify(newJoined));
      setCommunities(
        communities.map((c) => (c.id === communityId ? updatedCommunity : c))
      );
      console.log('toggleJoin - Joined community:', updatedCommunity);
    } catch (err) {
      setError(err.message);
      console.error('toggleJoin - Error:', err);
    }
  };

  // Reset UI on logout
  useEffect(() => {
    if (!user) {
      setError(null);
      fetchCommunities(); // Refresh communities to reflect logged-out state
    }
  }, [user]);

  const leaveCommunity = async (communityId) => {
    try {
      console.log("leaveCommunity - Leaving community ID:", communityId); // Debug
      const newJoined = joinedCommunities.filter((id) => id !== communityId);
      setJoinedCommunities(newJoined);
      localStorage.setItem("joinedCommunities", JSON.stringify(newJoined));
      setShowFeed(false);
      setSelectedCommunity(null);
      setCommunityPosts([]);
      // Update backend if user is logged in
      if (user) {
        const token = localStorage.getItem("authToken");
        if (token) {
          const response = await fetch(
            `http://localhost:5000/api/communities/${communityId}/leave`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const errorData = await response.json().catch(() => ({}));
          if (!response.ok) {
            console.error("leaveCommunity - Backend error:", errorData);
          }
        }
      }
    } catch (err) {
      setError(err.message);
      console.error("leaveCommunity - Error:", err);
    }
  };

  const viewCommunity = (communityId) => {
    console.log("viewCommunity - Viewing community ID:", communityId); // Debug
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
    if (!newPost.trim() || !selectedCommunity) {
      setError("Post content and community selection are required");
      return;
    }
    if (!joinedCommunities.includes(selectedCommunity)) {
      setError("You must join the community to post");
      return;
    }

    try {
      console.log("handlePostSubmit - Posting to community ID:", selectedCommunity); // Debug
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `http://localhost:5000/api/communities/${selectedCommunity}/posts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({
            content: newPost.trim(),
            author: user ? user.fullName : "Guest",
            role: user ? user.role : "Guest",
          }),
        }
      );
      const errorData = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          `Failed to create post: ${response.status} ${errorData.error || response.statusText
          }`
        );
      }
      const newPostObj = errorData;
      setCommunityPosts([newPostObj, ...communityPosts]);
      setNewPost("");
      const communityResponse = await fetch(
        `http://localhost:5000/api/communities/${selectedCommunity}`
      );
      if (!communityResponse.ok) {
        throw new Error(`Failed to fetch community: ${communityResponse.status}`);
      }
      const updatedCommunity = await communityResponse.json();
      setCommunities(
        communities.map((c) =>
          c.id === selectedCommunity ? updatedCommunity : c
        )
      );
    } catch (err) {
      setError(err.message);
      console.error("handlePostSubmit - Error:", err);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        Error: {error}
      </div>
    );
  }

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
                  {community?.title || "Community"}
                </h1>
                <p className="text-sm text-gray-600">
                  {community ? `${community.members.toLocaleString()} members • ${community.posts} posts` : "Loading..."}
                </p>
              </div>
            </div>
            {joinedCommunities.includes(selectedCommunity) && (
              <button
                onClick={() => leaveCommunity(selectedCommunity)}
                className="rounded-md px-4 py-2 bg-red-600 text-white hover:bg-red-700"
              >
                <span className="flex items-center">
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  Leave Community
                </span>
              </button>
            )}
          </div>
        </div>

        <main className="max-w-3xl mx-auto px-4 py-8">
          {joinedCommunities.includes(selectedCommunity) ? (
            <form onSubmit={handlePostSubmit} className="mb-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <label
                  htmlFor="post-content"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Share your thoughts about {community?.title || "this community"}
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
          ) : (
            <div className="mb-6 bg-white rounded-xl shadow-sm p-6 text-gray-600 border border-yellow-300">
              <p className="font-semibold">
                Join {community?.title || "this community"} to post messages!
              </p>
              <button
                onClick={() => toggleJoin(selectedCommunity)}
                className="mt-2 rounded-md px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Join Now
              </button>
            </div>
          )}

          <div className="space-y-6">
            {communityFeed.length > 0 ? (
              communityFeed.map((post) => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {post.author} ({post.role})
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
              ))
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6 text-gray-600">
                No posts yet. Be the first to share!
              </div>
            )}
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
          Join communities that match your interests and connect with fellow pet lovers.
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
                  {user ? ( // Only show buttons if user is logged in
                    joinedCommunities.includes(community.id) ? (
                      <div className="flex space-x-4">
                        <button
                          onClick={() => viewCommunity(community.id)}
                          className="flex-1 rounded-md py-2 px-4 text-center font-medium cursor-pointer bg-green-600 text-white hover:bg-green-700"
                        >
                          <span className="flex items-center justify-center">
                            <i className="fas fa-comments mr-2"></i>
                            View Community Messages
                          </span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleJoin(community.id)}
                        className="w-full rounded-md py-2 px-4 text-center font-medium cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700"
                      >
                        <span className="flex items-center justify-center">
                          <i className="fas fa-plus mr-2"></i>
                          Join Community
                        </span>
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => navigate('/login')} // Redirect to login for non-authenticated users
                      className="w-full rounded-md py-2 px-4 text-center font-medium cursor-pointer bg-gray-600 text-white hover:bg-gray-700"
                    >
                      <span className="flex items-center justify-center">
                        <i className="fas fa-sign-in-alt mr-2"></i>
                        Login to Join
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