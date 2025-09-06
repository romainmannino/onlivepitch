import { supabase } from './supabase';

interface VisitData {
  url: string;
  userAgent: string;
  ipAddress?: string;
  city?: string;
  country?: string;
  referrer: string;
  sessionId: string;
}

// Generate a unique session ID for the visitor
function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Get or create session ID
function getSessionId(): string {
  let sessionId = localStorage.getItem('onlive_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('onlive_session_id', sessionId);
  }
  return sessionId;
}

// Get visitor's location using a free IP geolocation service
async function getLocationData(): Promise<{ city?: string; country?: string; ip?: string }> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data = await response.json();
      return {
        city: data.city,
        country: data.country_name,
        ip: data.ip
      };
    }
  } catch (error) {
    console.warn('Could not fetch location data:', error);
  }
  return {};
}

// Track page visit
export async function trackPageVisit(): Promise<void> {
  try {
    // Add debug logging
    console.log('Tracking page visit for URL:', window.location.href);
    
    const sessionId = getSessionId();
    const locationData = await getLocationData();
    
    // Get current time in French timezone
    const now = new Date();
    
    // Calculate French time properly
    const frenchTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
    const frenchTimeISO = frenchTime.toISOString();
    
    const visitData: VisitData = {
      url: window.location.href,
      userAgent: navigator.userAgent,
      ipAddress: locationData.ip,
      city: locationData.city,
      country: locationData.country,
      referrer: document.referrer || 'direct',
      sessionId
    };

    console.log('Sending visit data:', visitData);

    const { error } = await supabase
      .from('page_visits')
      .insert([{
        url: visitData.url,
        user_agent: visitData.userAgent,
        ip_address: visitData.ipAddress,
        city: visitData.city,
        country: visitData.country,
        referrer: visitData.referrer,
        session_id: visitData.sessionId,
        visited_at_french: frenchTimeISO
      }]);

    if (error) {
      console.error('Analytics tracking error:', error);
      console.warn('Analytics tracking error:', error);
    } else {
      console.log('Visit tracked successfully');
    }
  } catch (error) {
    console.error('Failed to track visit:', error);
    console.warn('Failed to track visit:', error);
  }
}

// Get analytics data (for dashboard)
export async function getAnalytics() {
  try {
    const { data, error } = await supabase
      .from('page_visits')
      .select('*')
      .order('visited_at', { ascending: false });

    if (error) {
      console.error('Error fetching analytics:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return null;
  }
}

// Get visit statistics
export async function getVisitStats() {
  try {
    // Total visits
    const { count: totalVisits } = await supabase
      .from('page_visits')
      .select('*', { count: 'exact', head: true });

    // Unique visitors (by session_id)
    const { data: uniqueVisitors } = await supabase
      .from('page_visits')
      .select('session_id')
      .group('session_id');

    // Visits by city
    const { data: visitsByCity } = await supabase
      .from('page_visits')
      .select('city, count(*)')
      .not('city', 'is', null)
      .group('city')
      .order('count', { ascending: false });

    // Recent visits (last 24 hours)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const { count: recentVisits } = await supabase
      .from('page_visits')
      .select('*', { count: 'exact', head: true })
      .gte('visited_at', yesterday.toISOString());

    return {
      totalVisits: totalVisits || 0,
      uniqueVisitors: uniqueVisitors?.length || 0,
      recentVisits: recentVisits || 0,
      visitsByCity: visitsByCity || []
    };
  } catch (error) {
    console.error('Failed to fetch visit stats:', error);
    return {
      totalVisits: 0,
      uniqueVisitors: 0,
      recentVisits: 0,
      visitsByCity: []
    };
  }
}