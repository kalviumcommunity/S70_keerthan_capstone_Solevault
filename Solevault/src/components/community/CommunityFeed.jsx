import React from "react";
import { Heart, MessageSquare, Share, User } from "lucide-react";

// Mock data for the community feed
const communityPosts = [
  {
    id: "1",
    username: "sneakerhead92",
    avatar: "https://i.pravatar.cc/150?img=1",
    timeAgo: "2h ago",
    content: "Just added these to my collection! What do you think?",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80",
    likes: 42,
    comments: 7,
  },
  {
    id: "2",
    username: "kickscollector",
    avatar: "https://i.pravatar.cc/150?img=2",
    timeAgo: "5h ago",
    content: "Market value of these Air Jordan 4s is going through the roof! Glad I got them for retail last month.",
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&q=80",
    likes: 87,
    comments: 23,
  },
  {
    id: "3",
    username: "raresnkrs",
    avatar: "https://i.pravatar.cc/150?img=3",
    timeAgo: "1d ago",
    content: "What's your grail pair that you're still hunting for? Mine is the Travis Scott x Fragment Jordan 1 High!",
    image: "",
    likes: 124,
    comments: 58,
  },
];

const CommunityFeed = () => {
  return (
    <div className="space-y-6">
      {communityPosts.map((post) => (
        <div key={post.id} className="bg-[#1a1a1a] p-4"> {/* Replaced solevault-card */}
          <div className="flex items-center mb-3">
            {post.avatar ? (
              <img
                src={post.avatar}
                alt={post.username}
                className="w-10 h-10 rounded-full object-cover mr-3 border border-[#262626]" // Replaced border-solevault-700
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#262626] flex items-center justify-center mr-3"> {/* Replaced bg-solevault-700 */}
                <User size={18} className="text-[#d4d4d4]" /> {/* Replaced text-solevault-300 */}
              </div>
            )}
            <div>
              <p className="text-[#fafafa] font-medium">{post.username}</p> {/* Replaced text-solevault-100 */}
              <p className="text-[#999999] text-xs">{post.timeAgo}</p> {/* Replaced text-solevault-500 */}
            </div>
          </div>
          
          <p className="text-[#d4d4d4] mb-3">{post.content}</p> {/* Replaced text-solevault-300 */}
          
          {post.image && (
            <div className="mb-3">
              <img
                src={post.image}
                alt="Post"
                className="w-full h-auto rounded-md"
              />
            </div>
          )}
          
          <div className="flex items-center justify-between pt-3 border-t border-[#1a1a1a]"> {/* Replaced border-solevault-800 */}
            <button className="flex items-center text-[#999999] hover:text-red-500 transition-colors"> {/* Replaced text-solevault-400 */}
              <Heart size={18} className="mr-1" />
              <span className="text-sm">{post.likes}</span>
            </button>
            
            <button className="flex items-center text-[#999999] hover:text-[#fafafa] transition-colors"> {/* Replaced text-solevault-400 and hover:text-solevault-100 */}
              <MessageSquare size={18} className="mr-1" />
              <span className="text-sm">{post.comments}</span>
            </button>
            
            <button className="flex items-center text-[#999999] hover:text-[#fafafa] transition-colors"> {/* Replaced text-solevault-400 and hover:text-solevault-100 */}
              <Share size={18} className="mr-1" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityFeed;