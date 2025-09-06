import React, { useState, useEffect } from 'react';
import { getAnalytics, getVisitStats } from '../lib/analytics';
import { BarChart3, Users, MapPin, Clock, Eye } from 'lucide-react';

interface Visit {
  id: string;
  url: string;
  user_agent: string;
  ip_address?: string;
  city?: string;
  country?: string;
  referrer: string;
  visited_at: string;
  session_id: string;
}

interface VisitStats {
  totalVisits: number;
  uniqueVisitors: number;
  recentVisits: number;
  visitsByCity: Array<{ city: string; count: number }>;
}

export default function AnalyticsDashboard() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [stats, setStats] = useState<VisitStats>({
    totalVisits: 0,
    uniqueVisitors: 0,
    recentVisits: 0,
    visitsByCity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [visitsData, statsData] = await Promise.all([
          getAnalytics(),
          getVisitStats()
        ]);
        
        if (visitsData) setVisits(visitsData);
        if (statsData) setStats(statsData);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Chargement des analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
          Analytics Dashboard - OnLive Pitch Deck
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-blue-900/40 backdrop-blur-sm border border-blue-600 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Total des visites</p>
                <p className="text-2xl font-bold text-white">{stats.totalVisits}</p>
              </div>
              <Eye className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-green-900/40 backdrop-blur-sm border border-green-600 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Visiteurs uniques</p>
                <p className="text-2xl font-bold text-white">{stats.uniqueVisitors}</p>
              </div>
              <Users className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="bg-purple-900/40 backdrop-blur-sm border border-purple-600 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">Visites (24h)</p>
                <p className="text-2xl font-bold text-white">{stats.recentVisits}</p>
              </div>
              <Clock className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-pink-900/40 backdrop-blur-sm border border-pink-600 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-400 text-sm font-medium">Villes différentes</p>
                <p className="text-2xl font-bold text-white">{stats.visitsByCity.length}</p>
              </div>
              <MapPin className="w-8 h-8 text-pink-400" />
            </div>
          </div>
        </div>

        {/* Visits by City */}
        {stats.visitsByCity.length > 0 && (
          <div className="bg-black/70 backdrop-blur-sm border border-gray-700 p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-3 text-blue-400" />
              Visites par ville
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {stats.visitsByCity.slice(0, 9).map((cityData, index) => (
                <div key={cityData.city} className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{cityData.city}</span>
                    <span className="text-white font-bold">{cityData.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Visits */}
        <div className="bg-black/70 backdrop-blur-sm border border-gray-700 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Clock className="w-6 h-6 mr-3 text-green-400" />
            Visites récentes
          </h2>
          
          {visits.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Aucune visite enregistrée pour le moment</p>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {visits.slice(0, 20).map((visit) => (
                <div key={visit.id} className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Date</p>
                      <p className="text-white">
                        {new Date(visit.visited_at).toLocaleDateString('fr-FR')}
                      </p>
                      <p className="text-gray-300">
                        {new Date(visit.visited_at).toLocaleTimeString('fr-FR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Localisation</p>
                      <p className="text-white">
                        {visit.city ? `${visit.city}, ${visit.country}` : 'Non disponible'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Référent</p>
                      <p className="text-white truncate">
                        {visit.referrer === 'direct' ? 'Accès direct' : visit.referrer}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Navigateur</p>
                      <p className="text-white truncate">
                        {visit.user_agent.includes('Chrome') ? 'Chrome' :
                         visit.user_agent.includes('Firefox') ? 'Firefox' :
                         visit.user_agent.includes('Safari') ? 'Safari' :
                         visit.user_agent.includes('Edge') ? 'Edge' : 'Autre'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back to Pitch Deck */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 rounded-full text-white font-semibold hover:scale-105 transition-transform duration-200"
          >
            ← Retour au Pitch Deck
          </a>
        </div>
      </div>
    </div>
  );
}