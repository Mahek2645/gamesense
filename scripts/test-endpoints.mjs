async function testAll() {
  const endpoints = [
    { name: '1. GET /api/analytics/overview', url: 'http://localhost:3000/api/analytics/overview' },
    { name: '2. GET /api/analytics/heatmaps?type=DEATH', url: 'http://localhost:3000/api/analytics/heatmaps?type=DEATH' },
    { name: '3. GET /api/analytics/heatmaps?type=MOVEMENT', url: 'http://localhost:3000/api/analytics/heatmaps?type=MOVEMENT' },
    { name: '4. GET /api/analytics/personas/comparison', url: 'http://localhost:3000/api/analytics/personas/comparison' },
    { name: '5. GET /api/sessions', url: 'http://localhost:3000/api/sessions' },
    { name: '6. GET /api/sessions/session-001', url: 'http://localhost:3000/api/sessions/session-001' },
    { name: '7. GET /api/recommendations', url: 'http://localhost:3000/api/recommendations' },
    { name: '8. POST /api/recommendations/analyze', url: 'http://localhost:3000/api/recommendations/analyze', method: 'POST' }
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep.url, {
        method: ep.method || 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: ep.method === 'POST' ? JSON.stringify({}) : undefined
      });
      const data = await res.json();
      console.log(`\n========================================`);
      console.log(`PASS [${res.status}]: ${ep.name}`);
      console.log(`========================================`);
      console.log(JSON.stringify(data, null, 2));
    } catch (e) {
      console.error(`FAIL: ${ep.name}:`, e.message);
    }
  }
}
testAll();
