import React, { useEffect, useState } from 'react';
import { Menu, X, Play, Users, MessageCircle, Zap, TrendingUp, Target, Award, Globe, Smartphone, Tv, Heart, Star, ArrowRight, Mail, Phone, MapPin, Calendar, DollarSign, BarChart3, Lightbulb, CheckCircle, ExternalLink } from 'lucide-react';
import { trackPageVisit } from './lib/analytics';
import AnalyticsButton from './components/AnalyticsButton';
import AnalyticsDashboard from './components/AnalyticsDashboard';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  useEffect(() => {
    // Track page visit when component mounts
    trackPageVisit();

    // Add scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .blur-to-focus');
    animatedElements.forEach(el => observer.observe(el));

    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-slow');
      parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (showAnalytics) {
    return <AnalyticsDashboard />;
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const printPitchDeck = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="https://gqclmjeeiwoqrphcbipg.supabase.co/storage/v1/object/public/logo/Design%20sans%20titre%20(30).png" 
                alt="OnLive Logo" 
                className="h-8 w-auto"
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <button onClick={() => scrollToSection('accueil')} className="text-gray-300 hover:text-white transition-colors">Accueil</button>
              <button onClick={() => scrollToSection('qui-sommes-nous')} className="text-gray-300 hover:text-white transition-colors">Qui sommes-nous</button>
              <button onClick={() => scrollToSection('le-constat')} className="text-gray-300 hover:text-white transition-colors">Le constat</button>
              <button onClick={() => scrollToSection('la-solution')} className="text-gray-300 hover:text-white transition-colors">La solution</button>
              <button onClick={() => scrollToSection('business-model')} className="text-gray-300 hover:text-white transition-colors">Business Model</button>
              <button onClick={() => scrollToSection('ou-en-sommes-nous')} className="text-gray-300 hover:text-white transition-colors">Où en sommes-nous</button>
              <button onClick={() => scrollToSection('acquisition')} className="text-gray-300 hover:text-white transition-colors">Acquisition</button>
              <button onClick={() => scrollToSection('story-telling')} className="text-gray-300 hover:text-white transition-colors">Story Telling</button>
              <button onClick={() => scrollToSection('pourquoi-nous')} className="text-gray-300 hover:text-white transition-colors">Pourquoi nous</button>
              <button onClick={() => scrollToSection('conclusion')} className="text-gray-300 hover:text-white transition-colors">Conclusion</button>
              <button 
                onClick={printPitchDeck}
                className="bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 px-4 py-2 rounded-full text-white font-semibold hover:scale-105 transition-transform duration-200"
              >
                Imprimer PDF
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800">
            <div className="px-4 py-6 space-y-4">
              <button onClick={() => scrollToSection('accueil')} className="block text-gray-300 hover:text-white transition-colors">Accueil</button>
              <button onClick={() => scrollToSection('qui-sommes-nous')} className="block text-gray-300 hover:text-white transition-colors">Qui sommes-nous</button>
              <button onClick={() => scrollToSection('le-constat')} className="block text-gray-300 hover:text-white transition-colors">Le constat</button>
              <button onClick={() => scrollToSection('la-solution')} className="block text-gray-300 hover:text-white transition-colors">La solution</button>
              <button onClick={() => scrollToSection('business-model')} className="block text-gray-300 hover:text-white transition-colors">Business Model</button>
              <button onClick={() => scrollToSection('ou-en-sommes-nous')} className="block text-gray-300 hover:text-white transition-colors">Où en sommes-nous</button>
              <button onClick={() => scrollToSection('acquisition')} className="block text-gray-300 hover:text-white transition-colors">Acquisition</button>
              <button onClick={() => scrollToSection('story-telling')} className="block text-gray-300 hover:text-white transition-colors">Story Telling</button>
              <button onClick={() => scrollToSection('pourquoi-nous')} className="block text-gray-300 hover:text-white transition-colors">Pourquoi nous</button>
              <button onClick={() => scrollToSection('conclusion')} className="block text-gray-300 hover:text-white transition-colors">Conclusion</button>
              <button 
                onClick={printPitchDeck}
                className="bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 px-4 py-2 rounded-full text-white font-semibold hover:scale-105 transition-transform duration-200 w-full"
              >
                Imprimer PDF
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_70%)]"></div>
        <div className="text-center z-10 px-4 max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 fade-in-up bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            PITCH DECK
          </h1>
          
          <div className="mb-12 fade-in-up stagger-1">
            <img 
              src="https://gqclmjeeiwoqrphcbipg.supabase.co/storage/v1/object/public/logo/Design%20sans%20titre%20(30).png" 
              alt="OnLive Logo" 
              className="h-32 w-auto mx-auto mb-8"
            />
          </div>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 fade-in-up stagger-2 font-light">
            "You'll never watch alone"
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center fade-in-up stagger-3">
            <button 
              onClick={() => scrollToSection('qui-sommes-nous')}
              className="group bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 px-8 py-4 rounded-full text-white font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
            >
              Découvrir OnLive
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={printPitchDeck}
              className="border-2 border-gray-600 px-8 py-4 rounded-full text-white font-semibold text-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              Télécharger PDF
            </button>
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      </section>

      {/* Qui sommes-nous */}
      <section id="qui-sommes-nous" className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Qui sommes-nous ?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-left">
              <h3 className="text-3xl font-bold mb-6 text-white">OnLive</h3>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                OnLive est une application mobile révolutionnaire qui transforme l'expérience de visionnage télévisuel en créant des connexions sociales authentiques en temps réel.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Notre mission est de réunir les familles et amis dispersés géographiquement autour de leurs programmes préférés, recréant l'intimité du salon familial à l'ère numérique.
              </p>
            </div>
            
            <div className="fade-in-right">
              <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <Users className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <h4 className="text-2xl font-bold text-white">Social</h4>
                    <p className="text-gray-300">Connexions authentiques</p>
                  </div>
                  <div className="text-center">
                    <Tv className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                    <h4 className="text-2xl font-bold text-white">TV</h4>
                    <p className="text-gray-300">Expérience immersive</p>
                  </div>
                  <div className="text-center">
                    <Heart className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <h4 className="text-2xl font-bold text-white">Famille</h4>
                    <p className="text-gray-300">Moments partagés</p>
                  </div>
                  <div className="text-center">
                    <Globe className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <h4 className="text-2xl font-bold text-white">Mondial</h4>
                    <p className="text-gray-300">Sans frontières</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Le Constat */}
      <section id="le-constat" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up bg-gradient-to-r from-red-400 to-orange-600 bg-clip-text text-transparent">
            Le Constat
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-red-900/20 backdrop-blur-sm p-8 rounded-2xl border border-red-500/20 fade-in-up hover-lift">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Isolement Social</h3>
                <p className="text-gray-300 leading-relaxed">
                  Les familles et amis sont de plus en plus dispersés géographiquement, créant un sentiment d'isolement lors du visionnage TV.
                </p>
              </div>
            </div>
            
            <div className="bg-orange-900/20 backdrop-blur-sm p-8 rounded-2xl border border-orange-500/20 fade-in-up stagger-1 hover-lift">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Tv className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Expérience Passive</h3>
                <p className="text-gray-300 leading-relaxed">
                  Le visionnage télévisuel traditionnel est devenu une activité solitaire et passive, sans interaction sociale.
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-900/20 backdrop-blur-sm p-8 rounded-2xl border border-yellow-500/20 fade-in-up stagger-2 hover-lift">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Manque d'Interaction</h3>
                <p className="text-gray-300 leading-relaxed">
                  Les spectateurs ressentent le besoin de partager leurs émotions et réactions en temps réel avec leurs proches.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center fade-in-up stagger-3">
            <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 backdrop-blur-sm p-8 rounded-2xl border border-red-500/20 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-6">Le Problème Central</h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                <strong className="text-red-400">73% des téléspectateurs</strong> déclarent se sentir seuls en regardant leurs programmes préférés, 
                particulièrement lors d'événements sportifs ou d\'émissions en direct. Cette solitude numérique affecte 
                <strong className="text-orange-400"> plus de 2,8 milliards</strong> de personnes dans le monde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* La Solution */}
      <section id="la-solution" className="py-20 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            La Solution OnLive
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="fade-in-left">
              <h3 className="text-3xl font-bold mb-6 text-white">Une Révolution Sociale</h3>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                OnLive transforme chaque moment de visionnage en une expérience sociale immersive, 
                permettant aux utilisateurs de créer des "salons virtuels" avec leurs proches.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Synchronisation parfaite en temps réel</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Chat vocal et textuel intégré</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Réactions émotionnelles en direct</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-gray-300">Prédictions et paris amicaux</span>
                </div>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20">
                <h4 className="text-2xl font-bold text-white mb-6 text-center">Fonctionnalités Clés</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <Play className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                    <h5 className="font-semibold text-white">Sync Perfect</h5>
                    <p className="text-sm text-gray-300">Synchronisation milliseconde</p>
                  </div>
                  <div className="text-center">
                    <MessageCircle className="w-10 h-10 text-pink-400 mx-auto mb-3" />
                    <h5 className="font-semibold text-white">Chat Live</h5>
                    <p className="text-sm text-gray-300">Communication instantanée</p>
                  </div>
                  <div className="text-center">
                    <Zap className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                    <h5 className="font-semibold text-white">Réactions</h5>
                    <p className="text-sm text-gray-300">Émotions partagées</p>
                  </div>
                  <div className="text-center">
                    <Target className="w-10 h-10 text-green-400 mx-auto mb-3" />
                    <h5 className="font-semibold text-white">Prédictions</h5>
                    <p className="text-sm text-gray-300">Paris amicaux</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center fade-in-up">
            <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-6">L'Impact Attendu</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">+85%</div>
                  <p className="text-gray-300">Engagement utilisateur</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-400 mb-2">-60%</div>
                  <p className="text-gray-300">Sentiment d'isolement</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">+120%</div>
                  <p className="text-gray-300">Temps de visionnage</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section id="business-model" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
            Business Model
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-green-900/20 backdrop-blur-sm p-8 rounded-2xl border border-green-500/20 fade-in-up hover-lift">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Freemium</h3>
                <p className="text-gray-300 mb-4">Version gratuite avec fonctionnalités de base</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Salons jusqu'à 4 personnes</li>
                  <li>• Chat textuel basique</li>
                  <li>• Réactions limitées</li>
                  <li>• Publicités intégrées</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-900/20 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/20 fade-in-up stagger-1 hover-lift">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
                <p className="text-gray-300 mb-4">9,99€/mois - Expérience complète</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Salons illimités (50+ personnes)</li>
                  <li>• Chat vocal HD</li>
                  <li>• Toutes les réactions</li>
                  <li>• Sans publicité</li>
                  <li>• Statistiques avancées</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 fade-in-up stagger-2 hover-lift">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Partenariats</h3>
                <p className="text-gray-300 mb-4">Revenus B2B avec diffuseurs</p>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Intégration native</li>
                  <li>• Données d'audience</li>
                  <li>• Publicité ciblée</li>
                  <li>• Événements exclusifs</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-left">
              <h3 className="text-3xl font-bold mb-6 text-white">Projections Financières</h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 backdrop-blur-sm p-6 rounded-xl border border-green-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Année 1</span>
                    <span className="text-2xl font-bold text-green-400">€2.5M</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-2">500K utilisateurs actifs</div>
                </div>
                <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Année 3</span>
                    <span className="text-2xl font-bold text-blue-400">€15M</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-2">3M utilisateurs actifs</div>
                </div>
                <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Année 5</span>
                    <span className="text-2xl font-bold text-purple-400">€45M</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-2">10M utilisateurs actifs</div>
                </div>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="bg-gradient-to-br from-green-900/40 to-purple-900/40 backdrop-blur-sm p-8 rounded-2xl border border-green-500/20">
                <h4 className="text-2xl font-bold text-white mb-6 text-center">Sources de Revenus</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Abonnements Premium</span>
                    <span className="text-green-400 font-bold">65%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Publicité</span>
                    <span className="text-blue-400 font-bold">25%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{width: '25%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Partenariats B2B</span>
                    <span className="text-purple-400 font-bold">10%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{width: '10%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Où en sommes-nous */}
      <section id="ou-en-sommes-nous" className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up bg-gradient-to-r from-yellow-400 to-orange-600 bg-clip-text text-transparent">
            Où en sommes-nous ?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="fade-in-left">
              <h3 className="text-3xl font-bold mb-6 text-white">État Actuel du Projet</h3>
              <div className="space-y-6">
                <div className="bg-green-900/20 backdrop-blur-sm p-6 rounded-xl border border-green-500/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <h4 className="text-xl font-bold text-white">MVP Développé</h4>
                  </div>
                  <p className="text-gray-300">Prototype fonctionnel avec les fonctionnalités core testées et validées</p>
                </div>
                
                <div className="bg-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-blue-400" />
                    <h4 className="text-xl font-bold text-white">Tests Utilisateurs</h4>
                  </div>
                  <p className="text-gray-300">200+ beta testeurs avec un taux de satisfaction de 87%</p>
                </div>
                
                <div className="bg-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-purple-400" />
                    <h4 className="text-xl font-bold text-white">Équipe Constituée</h4>
                  </div>
                  <p className="text-gray-300">8 experts en développement, design UX/UI et marketing digital</p>
                </div>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="bg-gradient-to-br from-yellow-900/40 to-orange-900/40 backdrop-blur-sm p-8 rounded-2xl border border-yellow-500/20">
                <h4 className="text-2xl font-bold text-white mb-6 text-center">Métriques Actuelles</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">200+</div>
                    <p className="text-gray-300">Beta Testeurs</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">87%</div>
                    <p className="text-gray-300">Satisfaction</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">45min</div>
                    <p className="text-gray-300">Session moyenne</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">92%</div>
                    <p className="text-gray-300">Rétention J7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="fade-in-up">
            <h3 className="text-3xl font-bold text-center mb-8 text-white">Roadmap 2024-2025</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-red-900/20 backdrop-blur-sm p-6 rounded-xl border border-red-500/20 text-center">
                <Calendar className="w-8 h-8 text-red-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-2">Q1 2024</h4>
                <p className="text-gray-300 text-sm">Finalisation MVP et tests</p>
              </div>
              <div className="bg-yellow-900/20 backdrop-blur-sm p-6 rounded-xl border border-yellow-500/20 text-center">
                <Calendar className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-2">Q2 2024</h4>
                <p className="text-gray-300 text-sm">Lancement beta publique</p>
              </div>
              <div className="bg-green-900/20 backdrop-blur-sm p-6 rounded-xl border border-green-500/20 text-center">
                <Calendar className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-2">Q3 2024</h4>
                <p className="text-gray-300 text-sm">Lancement commercial</p>
              </div>
              <div className="bg-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 text-center">
                <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-2">Q4 2024</h4>
                <p className="text-gray-300 text-sm">Expansion internationale</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Acquisition */}
      <section id="acquisition" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up bg-gradient-to-r from-pink-400 to-red-600 bg-clip-text text-transparent">
            Stratégie d'Acquisition
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-pink-900/20 backdrop-blur-sm p-8 rounded-2xl border border-pink-500/20 fade-in-up hover-lift">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Marketing Digital</h3>
                <ul className="text-gray-300 space-y-2 text-left">
                  <li>• Campagnes TikTok/Instagram ciblées</li>
                  <li>• Partenariats avec influenceurs TV</li>
                  <li>• SEO/SEM optimisé</li>
                  <li>• Content marketing viral</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-red-900/20 backdrop-blur-sm p-8 rounded-2xl border border-red-500/20 fade-in-up stagger-1 hover-lift">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Croissance Virale</h3>
                <ul className="text-gray-300 space-y-2 text-left">
                  <li>• Programme de parrainage</li>
                  <li>• Invitations de groupe facilitées</li>
                  <li>• Gamification sociale</li>
                  <li>• Événements communautaires</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 fade-in-up stagger-2 hover-lift">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Partenariats Stratégiques</h3>
                <ul className="text-gray-300 space-y-2 text-left">
                  <li>• Intégration avec plateformes TV</li>
                  <li>• Collaborations avec chaînes</li>
                  <li>• Événements sportifs exclusifs</li>
                  <li>• Distributeurs télécom</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-left">
              <h3 className="text-3xl font-bold mb-6 text-white">Coût d'Acquisition Client (CAC)</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-pink-900/40 to-red-900/40 backdrop-blur-sm p-6 rounded-xl border border-pink-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Marketing Digital</span>
                    <span className="text-pink-400 font-bold">€12</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-red-900/40 to-purple-900/40 backdrop-blur-sm p-6 rounded-xl border border-red-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Parrainage Viral</span>
                    <span className="text-red-400 font-bold">€3</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Partenariats</span>
                    <span className="text-purple-400 font-bold">€8</span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 backdrop-blur-sm p-6 rounded-xl border border-green-500/20">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">CAC Moyen</span>
                    <span className="text-green-400 font-bold text-xl">€7.5</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 backdrop-blur-sm p-8 rounded-2xl border border-pink-500/20">
                <h4 className="text-2xl font-bold text-white mb-6 text-center">Objectifs d'Acquisition</h4>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-pink-400 mb-2">100K</div>
                    <p className="text-gray-300">Utilisateurs Année 1</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-400 mb-2">1M</div>
                    <p className="text-gray-300">Utilisateurs Année 2</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-400 mb-2">5M</div>
                    <p className="text-gray-300">Utilisateurs Année 3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Telling */}
      <section id="story-telling" className="py-20 bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
            Notre Histoire
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="fade-in-left">
              <h3 className="text-3xl font-bold mb-6 text-white">La Genèse d'OnLive</h3>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  Tout a commencé lors du confinement de 2020. Séparés de nos familles, nous avons ressenti cette 
                  frustration universelle : <strong className="text-indigo-400">regarder nos émissions préférées seuls</strong>, 
                  sans pouvoir partager nos émotions en temps réel.
                </p>
                <p>
                  C'est en essayant de synchroniser manuellement Netflix avec nos proches via WhatsApp que l'idée 
                  d'OnLive est née. <strong className="text-purple-400">"Et si on pouvait recréer l'expérience du salon familial, 
                  peu importe la distance ?"</strong>
                </p>
                <p>
                  Après 18 mois de développement intensif et des centaines d'heures d'interviews utilisateurs, 
                  OnLive est devenu bien plus qu'une simple app : <strong className="text-pink-400">c'est un pont émotionnel 
                  qui reconnecte les gens autour de leur passion commune.</strong>
                </p>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 backdrop-blur-sm p-8 rounded-2xl border border-indigo-500/20">
                <h4 className="text-2xl font-bold text-white mb-6 text-center">Moments Clés</h4>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-indigo-400 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-bold text-white">Mars 2020</h5>
                      <p className="text-gray-300 text-sm">Première idée pendant le confinement</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-purple-400 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-bold text-white">Septembre 2021</h5>
                      <p className="text-gray-300 text-sm">Début du développement technique</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-pink-400 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-bold text-white">Juin 2023</h5>
                      <p className="text-gray-300 text-sm">Premier prototype fonctionnel</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-bold text-white">Janvier 2024</h5>
                      <p className="text-gray-300 text-sm">Lancement des tests beta</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center fade-in-up">
            <div className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 backdrop-blur-sm p-8 rounded-2xl border border-indigo-500/20 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-6">Notre Vision</h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                <strong className="text-indigo-400">"Transformer chaque écran en fenêtre vers ceux qu'on aime."</strong>
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Dans un monde de plus en plus connecté technologiquement mais déconnecté humainement, 
                OnLive redonne du sens au temps passé devant nos écrans en le transformant en moments 
                de partage authentiques et mémorables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi Nous */}
      <section id="pourquoi-nous" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
            Pourquoi Nous ?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-orange-900/20 backdrop-blur-sm p-8 rounded-2xl border border-orange-500/20 fade-in-up hover-lift">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Innovation Technique</h3>
                <p className="text-gray-300 leading-relaxed">
                  Notre technologie de synchronisation sub-seconde et notre architecture cloud scalable 
                  nous positionnent en avance sur la concurrence.
                </p>
              </div>
            </div>
            
            <div className="bg-red-900/20 backdrop-blur-sm p-8 rounded-2xl border border-red-500/20 fade-in-up stagger-1 hover-lift">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Équipe d'Experts</h3>
                <p className="text-gray-300 leading-relaxed">
                  15+ années d'expérience combinées dans le streaming, l'UX/UI et le développement mobile 
                  chez Netflix, Spotify et TF1.
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-900/20 backdrop-blur-sm p-8 rounded-2xl border border-yellow-500/20 fade-in-up stagger-2 hover-lift">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Market Timing</h3>
                <p className="text-gray-300 leading-relaxed">
                  Le marché du social viewing explose (+340% en 2023) et nous sommes positionnés 
                  pour capturer cette croissance massive.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-left">
              <h3 className="text-3xl font-bold mb-6 text-white">Avantages Concurrentiels</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">Synchronisation Ultra-Précise</h4>
                    <p className="text-gray-300 text-sm">Technologie propriétaire sub-seconde</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">UX Intuitive</h4>
                    <p className="text-gray-300 text-sm">Interface pensée pour tous les âges</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">Scalabilité Prouvée</h4>
                    <p className="text-gray-300 text-sm">Architecture cloud native</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">Partenariats Stratégiques</h4>
                    <p className="text-gray-300 text-sm">Accords signés avec 3 diffuseurs majeurs</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="bg-gradient-to-br from-orange-900/40 to-red-900/40 backdrop-blur-sm p-8 rounded-2xl border border-orange-500/20">
                <h4 className="text-2xl font-bold text-white mb-6 text-center">L'Équipe Fondatrice</h4>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-orange-400" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white">Sarah Chen - CEO</h5>
                      <p className="text-gray-300 text-sm">Ex-Netflix, 8 ans streaming</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-red-400" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white">Marc Dubois - CTO</h5>
                      <p className="text-gray-300 text-sm">Ex-Spotify, expert scalabilité</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white">Julie Martin - CPO</h5>
                      <p className="text-gray-300 text-sm">Ex-TF1, design produit</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section id="conclusion" className="py-20 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Conclusion
          </h2>
          
          <div className="text-center mb-16 fade-in-up">
            <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-sm p-12 rounded-2xl border border-purple-500/20 max-w-4xl mx-auto">
              <h3 className="text-4xl font-bold text-white mb-8">L'Opportunité OnLive</h3>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                OnLive n'est pas juste une application, c'est une <strong className="text-purple-400">révolution sociale</strong> 
                qui transforme la façon dont 2,8 milliards de personnes regardent la télévision.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">€2.5M</div>
                  <p className="text-gray-300">Levée de fonds Série A</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-400 mb-2">18 mois</div>
                  <p className="text-gray-300">Time to market</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">10M€</div>
                  <p className="text-gray-300">Valorisation cible</p>
                </div>
              </div>
              <p className="text-lg text-gray-400 leading-relaxed">
                Rejoignez-nous dans cette aventure pour <strong className="text-pink-400">reconnecter l'humanité</strong> 
                autour de ce qu'elle aime regarder. Parce que les meilleurs moments se vivent ensemble.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-left">
              <h3 className="text-3xl font-bold mb-6 text-white">Prochaines Étapes</h3>
              <div className="space-y-4">
                <div className="bg-purple-900/20 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <span className="text-purple-400 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Finalisation Série A</h4>
                      <p className="text-gray-300 text-sm">€2.5M pour accélérer le développement</p>
                    </div>
                  </div>
                </div>
                <div className="bg-pink-900/20 backdrop-blur-sm p-6 rounded-xl border border-pink-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center">
                      <span className="text-pink-400 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Lancement Commercial</h4>
                      <p className="text-gray-300 text-sm">Q3 2024 - France puis Europe</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-900/20 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-blue-400 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Expansion Internationale</h4>
                      <p className="text-gray-300 text-sm">2025 - Marchés US et Asie</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 text-center">
                <h4 className="text-2xl font-bold text-white mb-6">Contactez-nous</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">contact@onlive.tv</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <Phone className="w-5 h-5 text-pink-400" />
                    <span className="text-gray-300">+33 1 23 45 67 89</span>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-300">Paris, France</span>
                  </div>
                </div>
                <div className="mt-8">
                  <button className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-8 py-4 rounded-full text-white font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25">
                    Planifier un RDV
                    <ExternalLink className="inline-block ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <img 
                src="https://gqclmjeeiwoqrphcbipg.supabase.co/storage/v1/object/public/logo/Design%20sans%20titre%20(30).png" 
                alt="OnLive Logo" 
                className="h-8 w-auto"
              />
              <span className="text-gray-400">© 2024 OnLive. Tous droits réservés.</span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p className="mb-2">"You'll never watch alone"</p>
              <p className="text-sm">Pitch Deck - Version 2.0</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Analytics Button */}
      <AnalyticsButton onClick={() => setShowAnalytics(true)} />
    </div>
  );
}

export default App;