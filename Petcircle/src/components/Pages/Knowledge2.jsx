import React, { useState, useEffect } from 'react';

const Knowledge2 = () => {
    const [showArticleForm, setShowArticleForm] = useState(false);
    const [showSessionForm, setShowSessionForm] = useState(false);
    const [articles, setArticles] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [newArticle, setNewArticle] = useState({
        title: "",
        category: "Training",
        content: "",
        image: "",
        redirectUrl: "",
        author: ""
    });
    const [newSession, setNewSession] = useState({
        title: "",
        category: "Pet Care",
        description: "",
        thumbnail: "",
        duration: "",
        redirectUrl: "",
        author: ""
    });

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('http://localhost:5000/articles');
                if (!response.ok) throw new Error('Failed to fetch articles');
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };
        
        const fetchSessions = async () => {
            try {
                const response = await fetch('http://localhost:5000/petsessions');
                if (!response.ok) throw new Error('Failed to fetch sessions');
                const data = await response.json();
                setSessions(data);
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        fetchArticles();
        fetchSessions();
    }, []);

    const handleArticleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newArticle),
            });
            if (!response.ok) throw new Error('Failed to create article');
            setShowArticleForm(false);
            setNewArticle({
                title: "",
                category: "Training",
                content: "",
                image: "",
                redirectUrl: "",
                author: ""
            });
            const updatedArticles = await fetch('http://localhost:5000/articles');
            if (updatedArticles.ok) {
                setArticles(await updatedArticles.json());
            }
        } catch (error) {
            console.error('Error submitting article:', error);
        }
    };

    const handleSessionSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/petsessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSession),
            });
            if (!response.ok) throw new Error('Failed to create session');
            setShowSessionForm(false);
            setNewSession({
                title: "",
                category: "Pet Care",
                description: "",
                thumbnail: "",
                duration: "",
                redirectUrl: "",
                author: ""
            });
            const updatedSessions = await fetch('http://localhost:5000/petsessions');
            if (updatedSessions.ok) {
                setSessions(await updatedSessions.json());
            }
        } catch (error) {
            console.error('Error submitting session:', error);
        }
    };

    return (
        <div className="pt-20 px-4 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Pet Knowledge Center
                </h1>
                <p className="text-gray-600">
                    Explore expert articles and community discussions about pet care and training.
                </p>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Featured Articles Section */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Featured Articles</h2>
                        <button
                            onClick={() => setShowArticleForm(true)}
                            className="rounded-button bg-purple-600 text-white px-4 py-2 flex items-center space-x-2 hover:bg-purple-700 transition duration-300 whitespace-nowrap"
                        >
                            <i className="fas fa-plus"></i>
                            <span>Add Article</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {articles.map((article, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300"
                            >
                                <div className="h-40 overflow-hidden">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                                    />
                                </div>
                                <div className="p-6">
                                    <span
                                        className={`text-sm font-medium mb-2 inline-block px-3 py-1 rounded-full ${
                                            article.category === "Training"
                                                ? "bg-blue-100 text-blue-600"
                                                : article.category === "Behavior"
                                                ? "bg-green-100 text-green-600"
                                                : article.category === "Nutrition"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : "bg-purple-100 text-purple-600"
                                        }`}
                                    >
                                        {article.category}
                                    </span>
                                    <h3 className="text-xl font-semibold mb-2 hover:text-purple-600 transition duration-300">
                                        <a href={article.redirectUrl} target="_blank" rel="noopener noreferrer">
                                            {article.title}
                                        </a>
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{article.content}</p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center space-x-2">
                                            <i className="fas fa-user-circle"></i>
                                            <span>{article.author}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <i className="fas fa-clock"></i>
                                            <span>{article.readTime || "8 min read"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Featured Video Sessions */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Featured Video Sessions</h2>
                        <button
                            onClick={() => setShowSessionForm(true)}
                            className="rounded-button bg-purple-600 text-white px-4 py-2 flex items-center space-x-2 hover:bg-purple-700 transition duration-300 whitespace-nowrap"
                        >
                            <i className="fas fa-plus"></i>
                            <span>Add Session</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {sessions.map((session, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-300"
                            >
                                <div className="relative group">
                                    <img
                                        src={session.thumbnail}
                                        alt={session.title}
                                        className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                        <a href={session.redirectUrl} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition duration-300 transform hover:scale-110">
                                            <i className="fas fa-play text-purple-600 text-xl"></i>
                                        </a>
                                    </div>
                                    <span className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                                        {session.duration}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <span
                                        className={`text-sm font-medium mb-2 inline-block px-3 py-1 rounded-full ${
                                            session.category === "Pet Care"
                                                ? "bg-blue-100 text-blue-600"
                                                : session.category === "Training"
                                                ? "bg-green-100 text-green-600"
                                                : session.category === "Nutrition"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : "bg-red-100 text-red-600"
                                        }`}
                                    >
                                        {session.category}
                                    </span>
                                    <h3 className="text-xl font-semibold mb-2 hover:text-purple-600 transition duration-300">
                                        <a href={session.redirectUrl} target="_blank" rel="noopener noreferrer">
                                            {session.title}
                                        </a>
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{session.description}</p>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center space-x-2">
                                            <i className="fas fa-user-circle text-gray-400"></i>
                                            <span className="text-gray-600">{session.author}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <i className="fas fa-eye text-gray-400"></i>
                                            <span className="text-gray-500">{session.views}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Q&A Section - unchanged */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">Popular Q&A</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                question: "How often should I take my dog to the vet for check-ups?",
                                answer: "Regular veterinary check-ups are recommended at least once a year for adult dogs and twice a year for senior dogs. Puppies need more frequent visits for vaccinations and monitoring growth.",
                                expert: "Dr. James Miller",
                                likes: 156,
                                category: "Health",
                            },
                            {
                                question: "What's the best way to introduce a new cat to my existing pet?",
                                answer: "Start by keeping them in separate rooms, gradually introduce their scents to each other, then allow supervised visual contact through a barrier before direct interaction. This process can take several weeks.",
                                expert: "Feline Behaviorist Lisa Chen",
                                likes: 234,
                                category: "Behavior",
                            },
                            {
                                question: "How can I prevent separation anxiety in my pet?",
                                answer: "Gradually accustom your pet to being alone by starting with short absences, provide engaging toys and activities, and maintain a consistent routine. Consider crate training for dogs.",
                                expert: "Animal Behaviorist Mark Thompson",
                                likes: 189,
                                category: "Training",
                            },
                            {
                                question: "What are the essential nutrients every pet needs in their diet?",
                                answer: "A balanced pet diet should include proteins, carbohydrates, fats, vitamins, minerals, and water. The specific amounts vary by species, age, and health condition. Always consult with your vet for personalized advice.",
                                expert: "Dr. Emma Taylor",
                                likes: 245,
                                category: "Nutrition",
                            },
                        ].map((qa, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition duration-300"
                            >
                                <div className="flex justify-between items-start mb-1">
                                    <div>
                                        <span
                                            className={`text-sm font-medium mb-3 inline-block px-3 py-1 rounded-full ${
                                                qa.category === "Health"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : qa.category === "Behavior"
                                                    ? "bg-green-100 text-green-600"
                                                    : qa.category === "Training"
                                                    ? "bg-purple-100 text-purple-600"
                                                    : "bg-yellow-100 text-yellow-600"
                                            }`}
                                        >
                                            {qa.category}
                                        </span>
                                        <h3 className="text-lg font-semibold text-gray-900 mt-2">
                                            {qa.question}
                                        </h3>
                                    </div>
                                    <button className="text-gray-400 hover:text-purple-600 transition duration-300">
                                        <i className="fas fa-bookmark"></i>
                                    </button>
                                </div>
                                <p className="text-gray-700 mb-6 line-clamp-3">{qa.answer}</p>
                                <div className="flex items-center justify-between text-sm border-t pt-4">
                                    <div className="flex items-center space-x-2">
                                        <i className="fas fa-user-circle text-gray-400 text-lg"></i>
                                        <span className="text-gray-600 font-medium">{qa.expert}</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition duration-300">
                                            <i className="fas fa-heart"></i>
                                            <span>{qa.likes}</span>
                                        </button>
                                        <button className="text-gray-500 hover:text-purple-600 transition duration-300">
                                            <i className="fas fa-share"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Article Form Modal */}
                {showArticleForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-semibold">Add New Article</h3>
                                <button
                                    onClick={() => setShowArticleForm(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <form onSubmit={handleArticleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                            value={newArticle.title}
                                            onChange={(e) =>
                                                setNewArticle({ ...newArticle, title: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Category
                                        </label>
                                        <select
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                            value={newArticle.category}
                                            onChange={(e) =>
                                                setNewArticle({ ...newArticle, category: e.target.value })
                                            }
                                        >
                                            <option value="Training">Training</option>
                                            <option value="Behavior">Behavior</option>
                                            <option value="Nutrition">Nutrition</option>
                                            <option value="Health">Health</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Content
                                        </label>
                                        <textarea
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                            rows={4}
                                            value={newArticle.content}
                                            onChange={(e) =>
                                                setNewArticle({ ...newArticle, content: e.target.value })
                                            }
                                            required
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Image URL
                                        </label>
                                        <input
                                            type="url"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                            value={newArticle.image}
                                            onChange={(e) =>
                                                setNewArticle({ ...newArticle, image: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Redirect URL
                                        </label>
                                        <input
                                            type="url"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                            value={newArticle.redirectUrl}
                                            onChange={(e) =>
                                                setNewArticle({ ...newArticle, redirectUrl: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Author
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                            value={newArticle.author}
                                            onChange={(e) =>
                                                setNewArticle({ ...newArticle, author: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowArticleForm(false)}
                                        className="rounded-button px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 whitespace-nowrap"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-button bg-purple-600 text-white px-4 py-2 hover:bg-purple-700 whitespace-nowrap"
                                    >
                                        Add Article
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Session Form Modal */}
                {showSessionForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-semibold">Add New Video Session</h3>
                                <button
                                    onClick={() => setShowSessionForm(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <form onSubmit={handleSessionSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                            value={newSession.title}
                                            onChange={(e) =>
                                                setNewSession({ ...newSession, title: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Category
                                        </label>
                                        <select
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                            value={newSession.category}
                                            onChange={(e) =>
                                                setNewSession({ ...newSession, category: e.target.value })
                                            }
                                        >
                                            <option value="Pet Care">Pet Care</option>
                                            <option value="Training">Training</option>
                                            <option value="Nutrition">Nutrition</option>
                                            <option value="Emergency">Emergency</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Description
                                        </label>
                                        <textarea
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                            rows={4}
                                            value={newSession.description}
                                            onChange={(e) =>
                                                setNewSession({ ...newSession, description: e.target.value })
                                            }
                                            required
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Thumbnail URL
                                        </label>
                                        <input
                                            type="url"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                            value={newSession.thumbnail}
                                            onChange={(e) =>
                                                setNewSession({ ...newSession, thumbnail: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Duration (mm:ss)
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                            placeholder="15:00"
                                            value={newSession.duration}
                                            onChange={(e) =>
                                                setNewSession({ ...newSession, duration: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Redirect URL
                                        </label>
                                        <input
                                            type="url"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                            value={newSession.redirectUrl}
                                            onChange={(e) =>
                                                setNewSession({ ...newSession, redirectUrl: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Author
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
                                            value={newSession.author}
                                            onChange={(e) =>
                                                setNewSession({ ...newSession, author: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowSessionForm(false)}
                                        className="rounded-button px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 whitespace-nowrap"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="rounded-button bg-purple-600 text-white px-4 py-2 hover:bg-purple-700 whitespace-nowrap"
                                    >
                                        Add Session
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Knowledge2;