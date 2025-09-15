import React, { useEffect, useState } from 'react';
import { 
  Play, 
  Users, 
  MessageCircle, 
  TrendingUp, 
  Star, 
  Smartphone, 
  Tv, 
  Heart,
  Target,
  Zap,
  Globe,
  Award,
  BarChart3,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Calendar,
  Clock,
  UserPlus,
  Share2,
  Eye,
  ThumbsUp,
  Download,
  Menu,
  X
} from 'lucide-react';
import { trackPageVisit } from './lib/analytics';
import AnalyticsButton from './components/AnalyticsButton';
import AnalyticsDashboard from './components/AnalyticsDashboard';

function App() {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="https://gqclmjeeiwoqrphcbipg.supabase.co/storage/v1/object/public/logo/Copie%20de%20On%20Live%20(6).png" 
                alt="OnLive Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                OnLive
              </span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              <button onClick={() => scrollToSection('accueil')} className="text-gray-300 hover:text-white transition-colors">
                Accueil
              </button>
              <button onClick={() => scrollToSection('qui-sommes-nous')} className="text-gray-300 hover:text-white transition-colors">
                Qui sommes-nous
              </button>
              <button onClick={() => scrollToSection('le-constat')} className="text-gray-300 hover:text-white transition-colors">
                Le constat
              </button>
              <button onClick={() => scrollToSection('la-solution')} className="text-gray-300 hover:text-white transition-colors">
                La solution
              </button>
              <button onClick={() => scrollToSection('business-model')} className="text-gray-300 hover:text-white transition-colors">
                Business Model
              </button>
              <button onClick={() => scrollToSection('ou-en-sommes-nous')} className="text-gray-300 hover:text-white transition-colors">
                Où en sommes-nous
              </button>
              <button onClick={() => scrollToSection('acquisition')} className="text-gray-300 hover:text-white transition-colors">
                Acquisition
              </button>
              <button onClick={() => scrollToSection('story-telling')} className="text-gray-300 hover:text-white transition-colors">
                Story Telling
              </button>
              <button onClick={() => scrollToSection('pourquoi-nous')} className="text-gray-300 hover:text-white transition-colors">
                Pourquoi nous
              </button>
              <button onClick={() => scrollToSection('conclusion')} className="text-gray-300 hover:text-white transition-colors">
                Conclusion
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button onClick={() => scrollToSection('accueil')} className="block px-3 py-2 text-gray-300 hover:text-white transition-colors w-full text-left">
                  Accueil
                </button>
                <button onClick={() => scrollToSection('qui-sommes-nous')} className="block px-3 py-2 text-gray-300 hover:text-white transition-colors w-full text-left">
                  Qui sommes-nous
                </button>
                <button onClick={() => scrollToSection('le-constat')} className="block px-3 py-2 text-gray-300 hover:text-white transition-colors w-full text-left">
                  Le constat
                </button>
                <button onClick={() => scrollToSection('la-solution')} className="block px-3 py-2 text-gray-300 hover:text-white transition-colors w-full text-left">
                  La solution
                </button>
                <button onClick={() => scrollToSection('business-model')} className="block px-3 py-2 text-gray-300 hover:text-white transition-colors w-full text-left">
                  Business Model
                </button>
                <button onClick={() => scrollToSection('ou-en-sommes-nous')} className="block px-3 py-2 text-gray-300 hover:text-white transition-colors w-full text-left">
                  Où en sommes-nous
                </button>
                <button onClick={() => scrollToSection('acquisition')} className="block px-3 py-2 text-gray-300 hover:text-white transition-colors w-full text-left">
                  Acquisition
                </button>
                <button onClick={() => scrollToSection('story-telling')} className="block px-3 py-2 text-gray-300 hover:text-white transition-colors w-full text-left">
                  Story Telling
                </button>
                <button onClick={() => scrollToSection('pourquoi-nous')} className="block px-3 py-2 text-gray-300 hover:text-white transition-colors w-full text-left">
                  Pourquoi nous
                </button>
                <button onClick={() => scrollToSection('conclusion')} className="block px-3 py-2 text-gray-300 hover:text-white transition-colors w-full text-left">
                  Conclusion
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-12 fade-in-up">
            <img 
              src="https://gqclmjeeiwoqrphcbipg.supabase.co/storage/v1/object/public/logo/Copie%20de%20On%20Live%20(6).png" 
              alt="OnLive Logo" 
              className="h-32 w-auto mx-auto mb-8"
            />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 fade-in-up stagger-1">
            <span className="bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              PITCH DECK
            </span>
          </h1>
          
          <div className="relative mb-12 fade-in-up stagger-2">
            <div className="border-4 border-cyan-400 rounded-3xl p-8 bg-black/50 backdrop-blur-sm shadow-2xl shadow-cyan-400/20 hover-lift">
              <div className="text-4xl md:text-6xl font-bold mb-4">
                <span className="text-cyan-400">ONLIVE</span>
                <span className="text-pink-500 ml-4">TV</span>
              </div>
              <div className="flex justify-center space-x-2 mb-6">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
          
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 fade-in-up stagger-3 font-light">
            "You'll never watch alone"
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center fade-in-up stagger-4">
            <button 
              onClick={() => scrollToSection('qui-sommes-nous')}
              className="group bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 px-8 py-4 rounded-full text-white font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Découvrir le projet</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={printPitchDeck}
              className="group border-2 border-gray-600 px-8 py-4 rounded-full text-white font-semibold text-lg hover:border-white hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Télécharger PDF</span>
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Qui sommes-nous Section */}
      <section id="qui-sommes-nous" className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up">
            <span className="bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Qui sommes-nous ?
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover-lift">
                <h3 className="text-3xl font-bold mb-6 text-white">Notre Vision</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  OnLive révolutionne l'expérience télévisuelle en créant des connexions sociales authentiques en temps réel. 
                  Nous transformons le visionnage passif en moments de partage interactifs.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-semibold text-white">Vision 2025</span>
                </div>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover-lift">
                <h3 className="text-3xl font-bold mb-6 text-white">Notre Mission</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Connecter les téléspectateurs du monde entier autour de leurs programmes favoris, 
                  créer des communautés engagées et transformer chaque moment TV en expérience sociale mémorable.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-semibold text-white">Communauté Globale</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center fade-in-up">
            <div className="bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-pink-900/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-4 text-white">L'équipe fondatrice</h3>
              <p className="text-gray-300 text-lg">
                Une équipe passionnée d'entrepreneurs et de développeurs, unis par la vision de révolutionner 
                l'industrie du divertissement télévisuel grâce à l'innovation technologique et sociale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Le Constat Section */}
      <section id="le-constat" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up">
            <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-600 bg-clip-text text-transparent">
              Le Constat
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-red-900/40 backdrop-blur-sm border border-red-600 p-8 rounded-xl text-center fade-in-up stagger-1 hover-lift">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Tv className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Visionnage Isolé</h3>
              <p className="text-gray-300">
                Les téléspectateurs regardent seuls, perdant l'aspect social du divertissement traditionnel.
              </p>
            </div>
            
            <div className="bg-orange-900/40 backdrop-blur-sm border border-orange-600 p-8 rounded-xl text-center fade-in-up stagger-2 hover-lift">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Manque d'Interaction</h3>
              <p className="text-gray-300">
                Absence d'outils pour partager émotions et réactions en temps réel avec ses proches.
              </p>
            </div>
            
            <div className="bg-yellow-900/40 backdrop-blur-sm border border-yellow-600 p-8 rounded-xl text-center fade-in-up stagger-3 hover-lift">
              <div className="w-16 h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Communautés Fragmentées</h3>
              <p className="text-gray-300">
                Les discussions se dispersent sur différentes plateformes, diluant l'expérience collective.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-12 border border-gray-700 fade-in-up">
            <h3 className="text-3xl font-bold text-center mb-8 text-white">Le Problème Central</h3>
            <p className="text-xl text-gray-300 text-center leading-relaxed max-w-4xl mx-auto">
              Dans un monde hyperconnecté, l'expérience télévisuelle reste paradoxalement solitaire. 
              Les moments de partage autour des programmes se perdent, créant un vide social que les plateformes 
              actuelles ne comblent pas efficacement.
            </p>
          </div>
        </div>
      </section>

      {/* La Solution Section */}
      <section id="la-solution" className="py-20 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up">
            <span className="bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              La Solution OnLive
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="fade-in-left">
              <h3 className="text-3xl font-bold mb-6 text-white">Une Plateforme Révolutionnaire</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                OnLive crée des "salons virtuels" où les utilisateurs peuvent regarder leurs programmes favoris 
                ensemble, partager leurs réactions en temps réel et créer des communautés autour de leurs passions télévisuelles.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-white">Synchronisation parfaite multi-écrans</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-white">Chat en temps réel avec réactions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-white">Création de groupes privés et publics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                  <span className="text-white">Intégration avec toutes les plateformes TV</span>
                </div>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover-lift">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">Expérience Immersive</h4>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-1">Connexion Instantanée</h5>
                      <p className="text-gray-300 text-sm">Rejoignez ou créez un salon en quelques clics</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-1">Partage en Temps Réel</h5>
                      <p className="text-gray-300 text-sm">Réactions, commentaires et émotions synchronisés</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-white mb-1">Communauté Engagée</h5>
                      <p className="text-gray-300 text-sm">Construisez des relations durables autour de vos passions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 fade-in-up">
            <div className="bg-blue-900/40 backdrop-blur-sm border border-blue-600 p-6 rounded-xl text-center hover-lift">
              <Smartphone className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h4 className="font-bold text-white mb-2">Multi-Plateforme</h4>
              <p className="text-gray-300 text-sm">iOS, Android, Web, Smart TV</p>
            </div>
            
            <div className="bg-green-900/40 backdrop-blur-sm border border-green-600 p-6 rounded-xl text-center hover-lift">
              <Zap className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h4 className="font-bold text-white mb-2">Temps Réel</h4>
              <p className="text-gray-300 text-sm">Synchronisation < 100ms</p>
            </div>
            
            <div className="bg-purple-900/40 backdrop-blur-sm border border-purple-600 p-6 rounded-xl text-center hover-lift">
              <Globe className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h4 className="font-bold text-white mb-2">Global</h4>
              <p className="text-gray-300 text-sm">Disponible dans 50+ pays</p>
            </div>
            
            <div className="bg-pink-900/40 backdrop-blur-sm border border-pink-600 p-6 rounded-xl text-center hover-lift">
              <Heart className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h4 className="font-bold text-white mb-2">Social</h4>
              <p className="text-gray-300 text-sm">Connexions authentiques</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Model Section */}
      <section id="business-model" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Business Model
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-green-900/40 backdrop-blur-sm border border-green-600 p-8 rounded-xl fade-in-up stagger-1 hover-lift">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white text-center">Freemium</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Version gratuite avec publicités</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Premium à 9,99€/mois</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Fonctionnalités exclusives</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-blue-900/40 backdrop-blur-sm border border-blue-600 p-8 rounded-xl fade-in-up stagger-2 hover-lift">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white text-center">Partenariats</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span>Chaînes de télévision</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span>Plateformes de streaming</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-blue-400" />
                  <span>Revenus partagés</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-purple-900/40 backdrop-blur-sm border border-purple-600 p-8 rounded-xl fade-in-up stagger-3 hover-lift">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white text-center">Publicité Ciblée</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  <span>Données comportementales</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  <span>Publicité contextuelle</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-purple-400" />
                  <span>ROI optimisé</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-12 border border-gray-700 fade-in-up">
            <h3 className="text-3xl font-bold text-center mb-8 text-white">Projections Financières</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-green-400 mb-2">2M€</div>
                <div className="text-gray-300">Chiffre d'affaires Année 1</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400 mb-2">15M€</div>
                <div className="text-gray-300">Chiffre d'affaires Année 3</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400 mb-2">25%</div>
                <div className="text-gray-300">Marge nette projetée</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Où en sommes-nous Section */}
      <section id="ou-en-sommes-nous" className="py-20 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up">
            <span className="bg-gradient-to-r from-purple-400 via-blue-500 to-green-600 bg-clip-text text-transparent">
              Où en sommes-nous ?
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="fade-in-left">
              <h3 className="text-3xl font-bold mb-6 text-white">Développement Actuel</h3>
              <div className="space-y-6">
                <div className="bg-purple-900/40 backdrop-blur-sm border border-purple-600 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-semibold">MVP Développé</span>
                    <span className="text-green-400 font-bold">100%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-green-500 h-2 rounded-full w-full"></div>
                  </div>
                </div>
                
                <div className="bg-blue-900/40 backdrop-blur-sm border border-blue-600 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-semibold">Tests Utilisateurs</span>
                    <span className="text-blue-400 font-bold">85%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-4/5"></div>
                  </div>
                </div>
                
                <div className="bg-green-900/40 backdrop-blur-sm border border-green-600 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-semibold">Partenariats</span>
                    <span className="text-yellow-400 font-bold">60%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full w-3/5"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover-lift">
                <h3 className="text-2xl font-bold mb-6 text-white">Réalisations Clés</h3>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Application mobile iOS/Android fonctionnelle</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Plateforme web responsive développée</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Système de synchronisation temps réel opérationnel</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Base d'utilisateurs beta de 1000+ testeurs</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Premiers accords de partenariat signés</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Équipe technique de 8 développeurs</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Propriété intellectuelle protégée</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6 fade-in-up">
            <div className="bg-green-900/40 backdrop-blur-sm border border-green-600 p-6 rounded-xl text-center hover-lift">
              <div className="text-3xl font-bold text-green-400 mb-2">1000+</div>
              <div className="text-gray-300">Utilisateurs Beta</div>
            </div>
            
            <div className="bg-blue-900/40 backdrop-blur-sm border border-blue-600 p-6 rounded-xl text-center hover-lift">
              <div className="text-3xl font-bold text-blue-400 mb-2">50K+</div>
              <div className="text-gray-300">Messages échangés</div>
            </div>
            
            <div className="bg-purple-900/40 backdrop-blur-sm border border-purple-600 p-6 rounded-xl text-center hover-lift">
              <div className="text-3xl font-bold text-purple-400 mb-2">95%</div>
              <div className="text-gray-300">Satisfaction utilisateurs</div>
            </div>
            
            <div className="bg-pink-900/40 backdrop-blur-sm border border-pink-600 p-6 rounded-xl text-center hover-lift">
              <div className="text-3xl font-bold text-pink-400 mb-2">8</div>
              <div className="text-gray-300">Partenaires potentiels</div>
            </div>
          </div>
        </div>
      </section>

      {/* Acquisition Section */}
      <section id="acquisition" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up">
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-clip-text text-transparent">
              Stratégie d'Acquisition
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="fade-in-left">
              <h3 className="text-3xl font-bold mb-6 text-white">Canaux d'Acquisition</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Share2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Marketing Viral</h4>
                    <p className="text-gray-300">Système de parrainage et partage social intégré</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <UserPlus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Influenceurs TV</h4>
                    <p className="text-gray-300">Partenariats avec créateurs de contenu et critiques</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">SEO/SEM</h4>
                    <p className="text-gray-300">Optimisation pour les recherches liées au divertissement</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="bg-gradient-to-br from-orange-900/40 via-red-900/40 to-pink-900/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover-lift">
                <h3 className="text-2xl font-bold mb-6 text-white text-center">Objectifs d'Acquisition</h3>
                
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-400 mb-2">10K</div>
                    <div className="text-gray-300">Utilisateurs Mois 1</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-400 mb-2">100K</div>
                    <div className="text-gray-300">Utilisateurs Mois 6</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold text-pink-400 mb-2">1M</div>
                    <div className="text-gray-300">Utilisateurs Année 1</div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-black/50 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">CAC: 15€</div>
                    <div className="text-gray-300 text-sm">Coût d'Acquisition Client</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 fade-in-up">
            <div className="bg-orange-900/40 backdrop-blur-sm border border-orange-600 p-8 rounded-xl text-center hover-lift">
              <Calendar className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-4">Phase 1: Lancement</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Campagne de pré-lancement</li>
                <li>• Partenariats influenceurs</li>
                <li>• Relations presse</li>
                <li>• Community management</li>
              </ul>
            </div>
            
            <div className="bg-red-900/40 backdrop-blur-sm border border-red-600 p-8 rounded-xl text-center hover-lift">
              <TrendingUp className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-4">Phase 2: Croissance</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Publicité payante ciblée</li>
                <li>• Programme de parrainage</li>
                <li>• Partenariats chaînes TV</li>
                <li>• Événements spéciaux</li>
              </ul>
            </div>
            
            <div className="bg-pink-900/40 backdrop-blur-sm border border-pink-600 p-8 rounded-xl text-center hover-lift">
              <Globe className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-4">Phase 3: Expansion</h4>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Expansion internationale</li>
                <li>• Nouvelles fonctionnalités</li>
                <li>• Partenariats stratégiques</li>
                <li>• Diversification contenu</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Story Telling Section */}
      <section id="story-telling" className="py-20 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
              Notre Histoire
            </span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 fade-in-up hover-lift">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">L'Étincelle</h3>
              </div>
              
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Tout a commencé lors d'un confinement, quand regarder la télévision seul est devenu la norme. 
                  Nos fondateurs ont réalisé à quel point les moments de partage autour des programmes TV leur manquaient. 
                  Cette nostalgie des soirées télé en famille ou entre amis a donné naissance à OnLive.
                </p>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  "Et si on pouvait recréer cette magie du visionnage collectif, mais à distance ?" 
                  Cette question simple a déclenché des mois de recherche, de développement et de tests. 
                  L'objectif était clair : transformer l'isolement numérique en connexion authentique.
                </p>
                
                <p className="text-gray-300 text-lg leading-relaxed">
                  Aujourd'hui, OnLive n'est plus seulement une idée, c'est une réalité qui connecte des milliers 
                  de personnes autour de leurs passions télévisuelles. Chaque utilisateur qui rejoint notre communauté 
                  confirme que nous avons touché juste : le besoin de partager nos émotions en temps réel est universel.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16 fade-in-up">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">2020</h4>
                <p className="text-gray-300">Conception de l'idée</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">2022</h4>
                <p className="text-gray-300">Développement MVP</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">2024</h4>
                <p className="text-gray-300">Lancement public</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi Nous Section */}
      <section id="pourquoi-nous" className="py-20 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
              Pourquoi Nous ?
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="fade-in-left">
              <h3 className="text-3xl font-bold mb-8 text-white">Nos Avantages Concurrentiels</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Expertise Technique</h4>
                    <p className="text-gray-300">Équipe de développeurs seniors avec 10+ ans d'expérience</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Innovation Technologique</h4>
                    <p className="text-gray-300">Algorithmes propriétaires de synchronisation temps réel</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">Vision Utilisateur</h4>
                    <p className="text-gray-300">Conception centrée sur l'expérience et les besoins réels</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="bg-gradient-to-br from-yellow-900/40 via-orange-900/40 to-red-900/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover-lift">
                <h3 className="text-2xl font-bold mb-6 text-white text-center">Nos Atouts Uniques</h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Première plateforme de co-visionnage vraiment sociale</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Technologie de synchronisation sub-seconde</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Interface intuitive et addictive</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Modèle économique diversifié et scalable</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Équipe passionnée et expérimentée</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Inventeurs et Premiers en Europe à lancer des plaques NFC/QR de partage social</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Plusieurs milliers de plaques vendues</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-12 border border-gray-700 fade-in-up">
            <h3 className="text-3xl font-bold text-center mb-8 text-white">Notre Engagement</h3>
            <p className="text-xl text-gray-300 text-center leading-relaxed max-w-4xl mx-auto">
              Nous ne créons pas seulement une application, nous bâtissons l'avenir du divertissement social. 
              Notre mission est de reconnecter les gens autour de leurs passions communes et de créer des moments 
              de bonheur partagé, où qu'ils soient dans le monde.
            </p>
          </div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section id="conclusion" className="py-20 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-600 bg-clip-text text-transparent">
              Conclusion
            </span>
          </h2>
          
          <div className="max-w-4xl mx-auto text-center fade-in-up">
            <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-12 border border-gray-700 hover-lift">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-6">L'Avenir du Divertissement</h3>
              </div>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                OnLive représente bien plus qu'une simple application : c'est une révolution sociale qui transforme 
                la façon dont nous consommons et partageons le divertissement. Dans un monde de plus en plus connecté 
                mais paradoxalement isolé, nous offrons la solution pour recréer du lien authentique.
              </p>
              
              <p className="text-lg text-gray-300 leading-relaxed mb-12">
                Avec un marché addressable de plusieurs milliards d'euros, une technologie éprouvée et une équipe 
                passionnée, OnLive est prêt à devenir le leader mondial du co-visionnage social. 
                Rejoignez-nous dans cette aventure extraordinaire !
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="group bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 px-8 py-4 rounded-full text-white font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <span>Contactez-nous</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">Investissement recherché</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                    2M€
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16 fade-in-up">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Contactez-nous
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="fade-in-left">
              <h3 className="text-3xl font-bold mb-8 text-white">Prêt à révolutionner le divertissement ?</h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Rejoignez-nous dans cette aventure extraordinaire. Que vous soyez investisseur, partenaire ou simplement 
                curieux de découvrir OnLive, nous serions ravis d'échanger avec vous.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Email</div>
                    <div className="text-gray-300">onlivetvapp@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Téléphone</div>
                    <div className="text-gray-300">+33 1 23 45 67 89</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">Localisation</div>
                    <div className="text-gray-300">Paris, France</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-700 hover-lift">
                <h4 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h4>
                <form className="space-y-6">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Votre nom" 
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Votre email" 
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Votre message" 
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 px-6 py-3 rounded-lg text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Envoyer le message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <img 
                src="https://gqclmjeeiwoqrphcbipg.supabase.co/storage/v1/object/public/logo/Copie%20de%20On%20Live%20(6).png" 
                alt="OnLive Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                OnLive
              </span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">© 2024 OnLive. Tous droits réservés.</p>
              <p className="text-gray-500 text-sm">"You'll never watch alone"</p>
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