import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';

const Dashboard = () => {
  const [showLoginPanel, setShowLoginPanel] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    avgPostsPerCommunity: 0,
    eventRegistrations: 0,
    totalPets: 0,
    totalArticles: 0,
    totalSessions: 0,
    totalAdoptions: 0,
  });
  const [articleData, setArticleData] = useState({ total: 0, categories: [], recent: null });
  const [sessionData, setSessionData] = useState({ total: 0, categories: [], recent: null });
  const [petTypes, setPetTypes] = useState([]);
  const [registrationTrends, setRegistrationTrends] = useState({ months: [], counts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(null);

  const token = localStorage.getItem('authToken') || 'mock-token';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch stats
        const statsResponse = await fetch('http://localhost:5000/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const statsData = statsResponse.ok ? await statsResponse.json() : null;
        setStats(
          statsData || {
            totalUsers: 12845,
            avgPostsPerCommunity: 150.5,
            eventRegistrations: 1200,
            totalPets: 8623,
            totalArticles: 50,
            totalSessions: 30,
            totalAdoptions: 128,
          }
        );

        // Fetch articles stats
        const articlesResponse = await fetch('http://localhost:5000/admin/articles-stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const articlesData = articlesResponse.ok ? await articlesResponse.json() : null;
        setArticleData(
          articlesData || {
            total: 50,
            categories: [
              { name: 'Training', value: 20 },
              { name: 'Nutrition', value: 15 },
              { name: 'Health', value: 10 },
              { name: 'Behavior', value: 5 },
            ],
            recent: {
              title: 'Dog Training Basics',
              category: 'Training',
              content: 'Learn basic commands...',
              image: 'https://via.placeholder.com/150',
              author: 'Jane Doe',
              createdAt: '2025-04-15',
            },
          }
        );

        // Fetch sessions stats
        const sessionsResponse = await fetch('http://localhost:5000/admin/sessions-stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sessionsData = sessionsResponse.ok ? await sessionsResponse.json() : null;
        setSessionData(
          sessionsData || {
            total: 30,
            categories: [
              { name: 'Training', value: 10, views: 500 },
              { name: 'Nutrition', value: 8, views: 300 },
              { name: 'Pet Care', value: 7, views: 200 },
              { name: 'Emergency', value: 5, views: 100 },
            ],
            recent: {
              title: 'Pet First Aid',
              category: 'Emergency',
              description: 'Emergency care tips...',
              thumbnail: 'https://via.placeholder.com/150',
              duration: '30 mins',
              views: 150,
              author: 'John Smith',
              createdAt: '2025-04-14',
            },
          }
        );

        // Fetch pet types
        const petsResponse = await fetch('http://localhost:5000/admin/pet-types', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const petsData = petsResponse.ok ? await petsResponse.json() : null;
        setPetTypes(
          petsData || [
            { name: 'Dog', value: 5000 },
            { name: 'Cat', value: 3000 },
            { name: 'Bird', value: 623 },
          ]
        );

        // Fetch registration trends
        const registrationsResponse = await fetch('http://localhost:5000/admin/registrations-trends', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const registrationsData = registrationsResponse.ok ? await registrationsResponse.json() : null;
        setRegistrationTrends(
          registrationsData || {
            months: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
            counts: [100, 150, 200, 250, 300, 350],
          }
        );
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (loading || error) return;

    const articleChart = echarts.init(document.getElementById('articleChart'));
    articleChart.setOption({
      animation: false,
      tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
      legend: { orient: 'vertical', right: 10, top: 'center' },
      series: [{
        name: 'Articles',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
        data: articleData.categories,
      }],
    });

    const sessionChart = echarts.init(document.getElementById('sessionChart'));
    sessionChart.setOption({
      animation: false,
      tooltip: { trigger: 'axis', formatter: '{b}<br/>{a}: {c}' },
      xAxis: { type: 'category', data: sessionData.categories.map(c => c.name) },
      yAxis: { type: 'value' },
      series: [{
        name: 'Sessions',
        type: 'bar',
        data: sessionData.categories.map(c => c.value),
        itemStyle: { color: '#10B981' },
      }],
    });

    const petChart = echarts.init(document.getElementById('petChart'));
    petChart.setOption({
      animation: false,
      tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
      legend: { orient: 'vertical', right: 10, top: 'center' },
      series: [{
        name: 'Pets',
        type: 'pie',
        radius: ['50%', '70%'],
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: false },
        emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } },
        data: petTypes,
      }],
    });

    const registrationChart = echarts.init(document.getElementById('registrationChart'));
    registrationChart.setOption({
      animation: false,
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: registrationTrends.months },
      yAxis: { type: 'value' },
      series: [{
        name: 'Registrations',
        type: 'line',
        smooth: true,
        data: registrationTrends.counts,
        lineStyle: { color: '#4F46E5' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(79, 70, 229, 0.3)' },
              { offset: 1, color: 'rgba(79, 70, 229, 0.05)' },
            ],
          },
        },
      }],
    });

    const handleResize = () => {
      articleChart.resize();
      sessionChart.resize();
      petChart.resize();
      registrationChart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      articleChart.dispose();
      sessionChart.dispose();
      petChart.dispose();
      registrationChart.dispose();
    };
  }, [loading, error, articleData, sessionData, petTypes, registrationTrends]);

  if (loading) return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="flex-1 flex items-center justify-center text-red-600">{error}</div>;

  const actions = [
    { icon: 'fa-users', text: 'Manage Users', onClick: () => alert('Navigate to Users') },
    { icon: 'fa-users-cog', text: 'Manage Communities', onClick: () => alert('Navigate to Communities') },
    { icon: 'fa-calendar', text: 'Manage Events', onClick: () => alert('Navigate to Events') },
    { icon: 'fa-book', text: 'Manage Articles', onClick: () => alert('Navigate to Articles') },
    { icon: 'fa-video', text: 'Manage Sessions', onClick: () => alert('Navigate to Sessions') },
  ];

  const insights = {
    community: { name: 'DogLovers', posts: 500 },
    event: { title: 'Pet Adoption Drive', registrations: 300 },
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-100">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <i className="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
          </div>
          <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200">
            <i className="fas fa-bell"></i>
          </button>
          <div className="relative">
            <button
              onClick={() => setShowLoginPanel(!showLoginPanel)}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <span className="text-sm font-medium">AD</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </button>
            {showLoginPanel && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Login</h3>
                    <button
                      onClick={() => setShowLoginPanel(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="remember"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                          Remember me
                        </label>
                      </div>
                      <button className="text-sm text-indigo-600 hover:text-indigo-800">
                        Forgot password?
                      </button>
                    </div>
                    <button
                      onClick={() => setShowLoginPanel(false)}
                      className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {[
            { icon: 'fa-users', title: 'Total Users', value: stats.totalUsers.toLocaleString(), change: '+12.5%' },
            { icon: 'fa-comment', title: 'Avg Posts/Community', value: stats.avgPostsPerCommunity, change: '+8.3%' },
            { icon: 'fa-ticket-alt', title: 'Event Registrations', value: stats.eventRegistrations.toLocaleString(), change: '+15.2%' },
            { icon: 'fa-paw', title: 'Total Pets', value: stats.totalPets.toLocaleString(), change: '+10.7%' },
            { icon: 'fa-book', title: 'Total Articles', value: stats.totalArticles.toLocaleString(), change: '+13.4%' },
            { icon: 'fa-video', title: 'Total Sessions', value: stats.totalSessions.toLocaleString(), change: '+11.9%' },
            { icon: 'fa-home', title: 'Total Adoptions', value: stats.totalAdoptions.toLocaleString(), change: '+9.6%' },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                  <i className={`fas ${stat.icon} fa-lg`}></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-sm text-green-600">
                  <i className="fas fa-arrow-up mr-1"></i>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Article Categories</h3>
            <div id="articleChart" className="h-80 w-full"></div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Session Categories</h3>
            <div id="sessionChart" className="h-80 w-full"></div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pet Types</h3>
            <div id="petChart" className="h-80 w-full"></div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Registration Trends</h3>
            <div id="registrationChart" className="h-80 w-full"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Insights</h3>
            <div className="space-y-4">
              <div className="p-3 border border-gray-100 rounded-lg">
                <h4 className="text-sm font-medium text-gray-800">Most Active Community</h4>
                <p className="text-xs text-gray-500 mt-1">{insights.community.name} ({insights.community.posts} posts)</p>
              </div>
              <div className="p-3 border border-gray-100 rounded-lg">
                <h4 className="text-sm font-medium text-gray-800">Top Event</h4>
                <p className="text-xs text-gray-500 mt-1">{insights.event.title} ({insights.event.registrations} registrations)</p>
              </div>
              {articleData.recent && (
                <div className="p-3 border border-gray-100 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800">Recent Article</h4>
                  <button
                    onClick={() => setShowModal({ type: 'article', ...articleData.recent })}
                    className="text-xs text-indigo-600 hover:text-indigo-800 mt-1"
                  >
                    {articleData.recent.title}
                  </button>
                </div>
              )}
              {sessionData.recent && (
                <div className="p-3 border border-gray-100 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-800">Recent Session</h4>
                  <button
                    onClick={() => setShowModal({ type: 'session', ...sessionData.recent })}
                    className="text-xs text-indigo-600 hover:text-indigo-800 mt-1"
                  >
                    {sessionData.recent.title}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className="w-full flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
                >
                  <i className={`fas ${action.icon} text-indigo-600`}></i>
                  <span className="ml-3 text-sm font-medium text-gray-700">{action.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {showModal.type === 'article' ? 'Article Details' : 'Session Details'}
              </h3>
              <button
                onClick={() => setShowModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-3">
              <p><strong>Title:</strong> {showModal.title}</p>
              <p><strong>Category:</strong> {showModal.category}</p>
              <p><strong>Author:</strong> {showModal.author}</p>
              <p><strong>Created:</strong> {new Date(showModal.createdAt).toLocaleDateString()}</p>
              {showModal.type === 'article' ? (
                <>
                  <p><strong>Content Preview:</strong> {showModal.content.slice(0, 100)}...</p>
                  <img src={showModal.image} alt={showModal.title} className="w-full h-32 object-cover rounded-lg" />
                </>
              ) : (
                <>
                  <p><strong>Description:</strong> {showModal.description.slice(0, 100)}...</p>
                  <p><strong>Duration:</strong> {showModal.duration}</p>
                  <p><strong>Views:</strong> {showModal.views}</p>
                  <img src={showModal.thumbnail} alt={showModal.title} className="w-full h-32 object-cover rounded-lg" />
                </>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowModal(null)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;