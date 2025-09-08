import React, { useState, useEffect } from 'react';
import { trackPageVisit } from './lib/analytics';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import AnalyticsButton from './components/AnalyticsButton';
import { 
  Play, 
  Users, 
  Target, 
  Lightbulb, 
  DollarSign, 
  Rocket, 
  TrendingUp, 
  Star,
  Heart,
  Download,
  Phone,
  Mail,
  Menu,
  X
} from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const sections = [
    { id: 'hero', label: 'Accueil', icon: Play },
    { id: 'qui-sommes-nous', label: 'Qui sommes-nous', icon: Users },
    { id: 'constat', label: 'Le constat', icon: Target },
    { id: 'solution', label: 'La solution', icon: Lightbulb },
    { id: 'business', label: 'Business Model', icon: DollarSign },
    { id: 'ou-en-sommes-nous', label: 'Où en sommes-nous', icon: Rocket },
    { id: 'acquisition', label: 'Acquisition', icon: TrendingUp },
    { id: 'story', label: 'Story Telling', icon: Heart },
    { id: 'nos-forces', label: 'Pourquoi nous', icon: Heart },
    { id: 'conclusion', label: 'Conclusion', icon: Target }
  ];

  // Scroll animation observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .blur-to-focus, .text-reveal'
    );
    
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [showAnalytics]);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-slow');
      
      parallaxElements.forEach((element) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Track page visit when component mounts
    trackPageVisit();
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Show analytics dashboard
  if (showAnalytics) {
    return <AnalyticsDashboard />;
  }

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="https://gqclmjeeiwoqrphcbipg.supabase.co/storage/v1/object/public/pitch/Copie%20de%20On%20Live%20(3).png" 
                alt="OnLive Logo"
                className="h-12 w-auto"
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-blue-600/20 via-pink-600/20 to-purple-600/20 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800/50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-blue-600/20 via-pink-600/20 to-purple-600/20 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 pt-20 bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 bg-clip-text text-transparent fade-in-up text-reveal">
            PITCH DECK
          </h1>
          <div className="flex items-center justify-center mb-8 scale-in stagger-1">
            <img 
              src="https://gqclmjeeiwoqrphcbipg.supabase.co/storage/v1/object/public/pitch/Copie%20de%20On%20Live%20(2).png" 
              alt="OnLive Logo"
              className="h-64 md:h-80 w-auto hover-lift"
            />
          </div>
          <p className="text-4xl md:text-5xl font-light text-gray-300 mb-12 fade-in-up stagger-2">
            "You'll never watch alone"
          </p>
        </div>
      </section>

      {/* Qui sommes-nous */}
      <section id="qui-sommes-nous" className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 text-black">
        <div className="absolute inset-0 parallax-slow">
          <img 
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop" 
            alt="Team collaboration" 
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 to-blue-50/90"></div>
        </div>
        <div className="max-w-7xl mx-auto">
          <h2 className="relative z-10 text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 bg-clip-text text-transparent fade-in-up">
            Qui sommes-nous
          </h2>
          
          <p className="relative z-10 text-xl text-gray-700 text-center mb-16 max-w-3xl mx-auto leading-relaxed fade-in-up stagger-1">
            Deux amis d'enfance (25 ans d'amitié), entrepreneurs et commerciaux expérimentés, 
            passionnés par l'innovation et le digital.
          </p>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-300 hover:border-blue-500/50 transition-colors duration-300 shadow-xl fade-in-left stagger-2 hover-lift">
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500 to-purple-600 scale-in stagger-3">
                <img 
                  src="https://gqclmjeeiwoqrphcbipg.supabase.co/storage/v1/object/public/pitch/Romain.jpg" 
                  alt="Romain Mannino"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Romain Mannino
              </h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>40 ans</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Marié, 2 enfants</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Propriétaire d'une maison à Jonage</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Gérant d'une SCI avec 2 locaux commerciaux</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Responsable commercial dans l'industrie du vélo</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>20 ans d'expérience dans le commerce B2B</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Visionnaire et entrepreneur dans l'âme</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-300 hover:border-pink-500/50 transition-colors duration-300 shadow-xl fade-in-right stagger-2 hover-lift">
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gradient-to-r from-pink-500 to-purple-600 scale-in stagger-4">
                <img 
                  src="https://gqclmjeeiwoqrphcbipg.supabase.co/storage/v1/object/public/pitch/Mickael.png" 
                  alt="Michaël Jacob"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Mickaël Jacob
              </h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>40 ans</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Marié, 2 enfants</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Propriétaire d'une maison à Jonage</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>20 ans d'expérience dans le commerce B2C</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Stratégie & Commercial</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>L'un des meilleurs commerciaux de son réseau</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Persuasif, fédérateur, esprit d'analyse</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative z-10 bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-300 shadow-xl fade-in-up stagger-3 hover-lift">
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              Expérience entrepreneuriale : CONNEKT
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start space-x-3 fade-in-left stagger-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Inventeurs et Premiers en Europe à lancer des plaques NFC/QR de partage social</span>
                  </li>
                  <li className="flex items-start space-x-3 fade-in-left stagger-4">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Plusieurs milliers de plaques vendues</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Le constat */}
      <section id="constat" className="py-20 px-4 relative overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img 
            src="https://gqclmjeeiwoqrphcbipg.supabase.co/storage/v1/object/public/pitch/devant%20tv.jpeg" 
            alt="Personne devant la TV" 
            className="w-full h-full object-cover object-top opacity-70"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <h2 className="relative z-10 text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 bg-clip-text text-transparent fade-in-up">
            Le constat à l'origine du projet
          </h2>
          
          {/* Sous-titre centré juste en dessous du titre */}
          <div className="relative z-10 text-center mb-12 fade-in-up stagger-1">
            <p className="text-white text-xl leading-relaxed max-w-4xl mx-auto">
              Les programmes TV en direct sont souvent regardés par des gens seuls sur leur canapé, 
              qui aiment partager leurs émotions/réactions mais ne savent pas avec qui le faire.
            </p>
          </div>
          
          {/* Layout principal avec téléphone et contenu à droite */}
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-start">
            {/* Colonne gauche - Téléphone WhatsApp agrandi */}
            <div className="flex justify-center lg:justify-start blur-to-focus stagger-2">
              <div className="w-full max-w-md lg:max-w-lg">
                <img 
                  src="https://gqclmjeeiwoqrphcbipg.supabase.co/storage/v1/object/public/pitch/disc%20whatasapp.png" 
                  alt="Discussion WhatsApp"
                  className="w-full h-auto object-contain drop-shadow-2xl cursor-pointer hover:scale-105 transition-all duration-500 hover-lift"
                  onClick={() => setShowImageModal(true)}
                />
              </div>
            </div>
            
            {/* Colonne droite - Texte et alternatives */}
            <div className="space-y-8 lg:mt-16 lg:-ml-8">
              {/* Phrase "Une situation que nous vivons tous" */}
              <div className="mb-8 fade-in-right stagger-3">
                <p className="text-white text-xl font-semibold leading-relaxed">
                  Une situation que nous vivons tous : vouloir partager nos émotions devant la 
                  télé mais ne pas savoir qui regarde quoi au même moment.
                </p>
              </div>
              
              {/* Section alternatives existantes */}
              <div className="space-y-6 fade-in-right stagger-4">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Les alternatives existantes sont inadaptées :
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-black/80 backdrop-blur-sm border border-gray-600 p-6 rounded-xl hover-lift fade-in-up stagger-1">
                    <h4 className="text-xl font-semibold text-blue-400 mb-2">Twitter/X</h4>
                    <p className="text-gray-300">Public, anonyme, bruit</p>
                  </div>
                  
                  <div className="bg-black/80 backdrop-blur-sm border border-gray-600 p-6 rounded-xl hover-lift fade-in-up stagger-2">
                    <h4 className="text-xl font-semibold text-pink-400 mb-2">WhatsApp</h4>
                    <p className="text-gray-300">Privé, mais on ne sait pas qui regarde quoi</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600/30 via-pink-600/30 to-purple-600/30 backdrop-blur-sm p-6 rounded-xl border border-gray-500 scale-in stagger-3 hover-lift">
                  <p className="text-lg font-semibold text-white leading-relaxed">
                    👉 Aujourd'hui aucune solution n'existe pour savoir en temps réel<br />
                    "qui regarde quoi dans mon cercle proche".
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Slogan en bas sur toute la largeur */}
          <div className="relative z-10 mt-16 text-center fade-in-up stagger-4">
            <div className="bg-gradient-to-r from-blue-600/20 via-pink-600/20 to-purple-600/20 backdrop-blur-sm p-8 rounded-2xl border border-gray-500">
              <p className="text-3xl font-bold text-white text-reveal">
                "Onlive : le match est meilleur quand tu sais qui le regarde aussi"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* La solution */}
      <section id="solution" className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 text-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="relative z-10 text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 bg-clip-text text-transparent fade-in-up">
            La solution – ONLIVE
          </h2>
          
          <div className="relative z-10 max-w-4xl mx-auto mb-12">
            <p className="text-xl text-gray-700 text-center mb-12 leading-relaxed fade-in-up stagger-1">
              Une app mobile gratuite, simple et sociale qui permet de :
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center fade-in-up stagger-2">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 scale-in stagger-1 hover-lift">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <p className="text-lg font-semibold text-gray-800 mb-2">Indiquer en 1 clic</p>
                <p className="text-gray-600">ce que je regarde</p>
              </div>
              
              <div className="text-center fade-in-up stagger-3">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-pink-700 rounded-full flex items-center justify-center mx-auto mb-4 scale-in stagger-2 hover-lift">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <p className="text-lg font-semibold text-gray-800 mb-2">Voir qui</p>
                <p className="text-gray-600">de mes proches regarde quoi</p>
              </div>
              
              <div className="text-center fade-in-up stagger-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 scale-in stagger-3 hover-lift">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <p className="text-lg font-semibold text-gray-800 mb-2">Rejoindre</p>
                <p className="text-gray-600">la conversation privée & contextuelle</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-300 shadow-xl fade-in-up stagger-2 hover-lift">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Colonne gauche avec les 3 icônes et différenciation */}
              <div className="space-y-8 flex flex-col justify-center lg:mt-12 lg:ml-8 fade-in-left stagger-3">
                {/* Section Différenciation */}
                <div className="bg-black text-white p-8 rounded-2xl hover-lift">
                  <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Différenciation
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="border border-gray-600 p-6 rounded-xl fade-in-up stagger-1 hover-lift">
                      <h4 className="text-xl font-bold text-blue-400 mb-3">Événement OnLive</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Chaque jour, 2–3 programmes phares (PSG–OM, Koh Lanta, The Voice). 
                        → concentre l'audience, crée le rendez-vous.
                      </p>
                    </div>

                    <div className="border border-gray-600 p-6 rounded-xl fade-in-up stagger-2 hover-lift">
                      <h4 className="text-xl font-bold text-pink-400 mb-3">Cercle privé uniquement</h4>
                      <p className="text-gray-300 leading-relaxed">
                        Pas d'anonymes, pas de trolls → expérience saine.
                      </p>
                    </div>

                    <div className="border border-gray-600 p-6 rounded-xl fade-in-up stagger-3 hover-lift">
                      <h4 className="text-xl font-bold text-purple-400 mb-3">Ultra simple</h4>
                      <p className="text-gray-300 leading-relaxed">
                        En un geste, je sais qui regarde quoi → discussion instantanée.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Citation finale */}
                <div className="bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100 p-6 rounded-xl text-center border border-gray-400 scale-in stagger-4 hover-lift">
                  <p className="text-xl font-bold text-gray-800">
                    "OnLive, c'est le canapé partagé à distance."
                  </p>
                </div>
              </div>
              
              {/* Colonne droite avec le téléphone très grand */}
              <div className="flex justify-center lg:justify-center items-center blur-to-focus stagger-4">
                <div className="w-full max-w-xl lg:max-w-2xl">
                  <img 
                    src="https://gqclmjeeiwoqrphcbipg.supabase.co/storage/v1/object/public/pitch/app%20onlive.png" 
                    alt="Application OnLive"
                    className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-all duration-500 hover-lift"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section id="business" className="py-20 px-4 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="relative z-10 text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 bg-clip-text text-transparent fade-in-up">
            Business Model & Exit
          </h2>
          
          <div className="relative z-10 max-w-6xl mx-auto space-y-12">
            {/* Sources de revenus */}
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-gray-600 shadow-xl fade-in-up stagger-1 hover-lift">
              <h3 className="text-3xl font-bold text-white mb-6 flex items-center">
                <DollarSign className="w-8 h-8 mr-3 text-yellow-400" />
                💰 Sources de revenus (dès 500k → 5M téléchargements)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Publicité */}
                <div className="bg-blue-900/40 backdrop-blur-sm border border-blue-500 p-6 rounded-xl fade-in-left stagger-2 hover-lift">
                  <h4 className="text-2xl font-bold text-blue-400 mb-4">1. Publicité</h4>
                  <p className="text-blue-200 mb-3">(bandeaux & interstitiels)</p>
                  <div className="space-y-2 text-white">
                    <p>• CPM moyen 2–5 €</p>
                    <p className="text-lg font-semibold text-blue-300">~5 M€ de CA/an à 2,5M utilisateurs actifs</p>
                  </div>
                </div>

                {/* Data Insights */}
                <div className="bg-purple-900/40 backdrop-blur-sm border border-purple-500 p-6 rounded-xl fade-in-right stagger-3 hover-lift">
                  <h4 className="text-2xl font-bold text-purple-400 mb-4">2. Data Insights</h4>
                  <p className="text-purple-200 mb-3">(émotions & engagement TV en temps réel)</p>
                  <div className="space-y-2 text-white">
                    <p>• Valeur : 1–5 €/utilisateur actif/an</p>
                    <p className="text-lg font-semibold text-purple-300">2,5 à 12,5 M€/an</p>
                    <p className="text-sm text-purple-200">(contrats avec TF1, M6, Canal+, Amazon, etc.)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Potentiel global */}
            <div className="bg-gradient-to-r from-green-900/40 via-emerald-900/40 to-teal-900/40 backdrop-blur-sm border border-green-500 p-8 rounded-2xl text-center fade-in-up stagger-4 hover-lift">
              <h3 className="text-3xl font-bold text-green-400 mb-4">📈 Potentiel global à 5M téléchargements (2,5M actifs)</h3>
              <p className="text-4xl font-bold text-white">👉 10–20 M€/CA annuel</p>
            </div>

            {/* Exit Strategy */}
            <div className="bg-gradient-to-r from-red-900/40 via-orange-900/40 to-yellow-900/40 backdrop-blur-sm border border-red-500 p-8 rounded-2xl fade-in-up stagger-5 hover-lift">
              <h3 className="text-3xl font-bold text-red-400 mb-6 flex items-center justify-center">
                🚪 Option de sortie stratégique (Exit)
              </h3>
              
              <p className="text-xl text-white mb-6 text-center">
                Dès 5M téléchargements, ONLIVE devient une cible naturelle de rachat par :
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-black/50 p-4 rounded-xl text-center">
                  <h4 className="text-lg font-bold text-blue-400 mb-2">Médias</h4>
                  <p className="text-white">TF1, M6, Canal+</p>
                </div>
                <div className="bg-black/50 p-4 rounded-xl text-center">
                  <h4 className="text-lg font-bold text-purple-400 mb-2">Streaming</h4>
                  <p className="text-white">Amazon Prime, Netflix</p>
                </div>
                <div className="bg-black/50 p-4 rounded-xl text-center">
                  <h4 className="text-lg font-bold text-pink-400 mb-2">Tech & réseaux sociaux</h4>
                  <p className="text-white">Meta, TikTok</p>
                </div>
              </div>
              
              <div className="bg-black/60 p-6 rounded-xl mb-6">
                <h4 className="text-xl font-bold text-yellow-400 mb-4">Pourquoi ?</h4>
                <ul className="space-y-2 text-white">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Audience massive & engagée</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Données émotionnelles temps réel uniques</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Complément direct à Médiamétrie (panel de 5000 foyers vs millions d'utilisateurs)</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-r from-green-600/30 to-emerald-600/30 p-6 rounded-xl">
                <h4 className="text-xl font-bold text-green-400 mb-4">Valorisation de sortie estimée :</h4>
                <div className="space-y-2 text-white mb-4">
                  <p>• CA projeté 10–20 M€</p>
                  <p>• Multiple 5–10x (standard media/data tech)</p>
                </div>
                <p className="text-3xl font-bold text-green-300 text-center">👉 50 à 200 M€</p>
              </div>
            </div>

            {/* Accroche finale */}
            <div className="bg-gradient-to-r from-blue-600/20 via-pink-600/20 to-purple-600/20 backdrop-blur-sm p-8 rounded-2xl border border-gray-500 text-center scale-in stagger-6 hover-lift">
              <p className="text-2xl font-bold text-white leading-relaxed">
                « ONLIVE = Médiamétrie 2.0 émotionnelle + WhatsApp TV social.<br />
                Un business scalable, et une cible évidente de rachat stratégique dès 5M de téléchargements. »
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Où en sommes-nous */}
      <section id="ou-en-sommes-nous" className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-purple-900 to-pink-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="relative z-10 text-5xl font-bold text-center mb-16 text-white fade-in-up">
            Où en sommes-nous
          </h2>
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <div className="bg-blue-800/60 backdrop-blur-sm border border-blue-400 p-8 rounded-2xl fade-in-left stagger-1 hover-lift">
              <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center">
                <Rocket className="w-6 h-6 mr-3" />
                MVP Web App fonctionnelle
              </h3>
              <p className="text-blue-100 leading-relaxed">
                Plusieurs semaines de test, modifications, améliorations...
              </p>
            </div>

            <div className="bg-green-800/60 backdrop-blur-sm border border-green-400 p-8 rounded-2xl fade-in-right stagger-2 hover-lift">
              <div className="relative">
                <h3 className="text-2xl font-bold text-green-400 mb-4">App native iOS/Android</h3>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-6xl font-bold text-white/30 transform rotate-12">EN COURS</span>
                </div>
              </div>
              <p className="text-green-100 leading-relaxed">
                Application mobile native avec notification push pour une expérience utilisateur optimale
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stratégie d'acquisition */}
      <section id="acquisition" className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 text-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="relative z-10 text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 bg-clip-text text-transparent fade-in-up">
            Stratégie d'acquisition utilisateur
          </h2>
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-300 shadow-xl fade-in-up stagger-1 hover-lift relative">
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                GRATUIT
              </div>
              <h3 className="text-2xl font-bold text-purple-600 mb-4">Stratégie de viralité</h3>
              <p className="text-gray-700 leading-relaxed">
                Chaque utilisateur doit inviter son cercle de proches pour que l'appli lui soit utile
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-300 shadow-xl fade-in-up stagger-2 hover-lift relative">
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                PAYANT
              </div>
              <h3 className="text-2xl font-bold text-pink-600 mb-4">Réseaux sociaux</h3>
              <p className="text-gray-700 leading-relaxed">
                Avec vidéos virales et impactantes
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-300 shadow-xl fade-in-up stagger-3 hover-lift relative">
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                TRÈS CHER
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Communication/publicité nationale TV</h3>
              <p className="text-gray-700 leading-relaxed">
                Recherche investisseur qui va croire en nous !
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image entre stratégie et story telling */}
      <div className="w-full fade-in-up">
        <img 
          src="https://gqclmjeeiwoqrphcbipg.supabase.co/storage/v1/object/public/pitch/regarde%20the%20voice.png" 
          alt="Regarder The Voice"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Story Telling */}
      <section id="story" className="pt-24 pb-20 px-4 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50 text-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="relative z-10 text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 bg-clip-text text-transparent fade-in-up">
            Story Telling
          </h2>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-100/95 via-pink-100/95 to-purple-100/95 p-8 rounded-2xl border border-gray-400 mb-8 fade-in-up stagger-1 hover-lift">
              <p className="text-2xl font-bold text-gray-800 text-center mb-4">
                OnLive n'est pas une app de plus.
              </p>
              <p className="text-xl text-gray-700 text-center">
                👉 C'est une nouvelle façon de regarder la télévision et de renforcer les liens sociaux.
              </p>
            </div>

            <div className="bg-white/95 p-8 rounded-2xl border border-gray-300 shadow-xl fade-in-up stagger-2 hover-lift">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Expérience personnelle de Mickaël :</h3>
              <p className="text-gray-700 leading-relaxed">
                Je suis très proche de mes cousins, mais nous nous voyons qu'une ou deux fois par an 
                à cause de la distance et de nos rythmes de vie. Nous partageons des centres d'intérêt 
                communs comme le football. Aucun de nous ne prend jamais l'initiative d'engager une 
                conversation de peur de déranger ou de mal tomber. OnLive resserrerait encore nos liens 
                car nous discuterions à coup sûr au moins une fois par semaine sur un match de foot 
                que nous regardons au même moment, le match devenant même à coup sûr un simple prétexte…
              </p>
              
              {/* Image des personnes regardant le football */}
              <div className="mt-8 flex justify-center">
                <img 
                  src="https://gqclmjeeiwoqrphcbipg.supabase.co/storage/v1/object/public/pitch/Sans%20titre%20(170%20x%2050%20cm).png" 
                  alt="Personnes regardant le football à la télévision"
                  className="w-full max-w-4xl h-auto object-contain rounded-xl shadow-lg scale-in stagger-3 hover-lift"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi nous */}
      <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="relative z-10 text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 bg-clip-text text-transparent fade-in-up">
            Pourquoi nous
          </h2>
          
          <div className="relative z-10 max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 fade-in-left stagger-1 hover-lift">
                <p className="text-gray-300 leading-relaxed">
                  <span className="text-blue-400 font-semibold">Expérience prouvée</span> en innovation produit (Connekt)
                </p>
              </div>
              
              <div className="bg-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 fade-in-left stagger-2 hover-lift">
                <p className="text-gray-300 leading-relaxed">
                  <span className="text-pink-400 font-semibold">Compétences commerciales</span> BtoB/BtoC → capacité à vendre et fédérer
                </p>
              </div>
              
              <div className="bg-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 fade-in-left stagger-3 hover-lift">
                <p className="text-gray-300 leading-relaxed">
                  <span className="text-purple-400 font-semibold">Vision claire</span> issue d'un vécu personnel (solitude devant TV)
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 fade-in-right stagger-1 hover-lift">
                <p className="text-gray-300 leading-relaxed">
                  <span className="text-blue-400 font-semibold">25 ans d'amitié</span> cimentée par la confiance et la résilience
                </p>
              </div>
              
              <div className="bg-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 fade-in-right stagger-2 hover-lift">
                <p className="text-gray-300 leading-relaxed">
                  <span className="text-pink-400 font-semibold">Envie d'entreprendre</span> obsessionnelle et détestation de la routine
                </p>
              </div>
              
              <div className="bg-black/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 fade-in-right stagger-3 hover-lift">
                <p className="text-gray-300 leading-relaxed">
                  <span className="text-purple-400 font-semibold">Capacité de travail</span> sans limite
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Conclusion */}
      <section id="conclusion" className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 text-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="relative z-10 text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 via-pink-500 to-purple-600 bg-clip-text text-transparent fade-in-up">
            Conclusion
          </h2>
          
          <div className="relative z-10 max-w-4xl mx-auto mb-12">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-300 mb-8 fade-in-up stagger-1 hover-lift">
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start space-x-3 fade-in-left stagger-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Pourquoi ce projet alors qu'ils ont une situation professionnelle stable?</span>
                </div>
                <div className="flex items-start space-x-3 fade-in-left stagger-2">
                  <div className="w-2 h-2 bg-pink-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Pourquoi ont ils fermé Connekt?</span>
                </div>
                <div className="flex items-start space-x-3 fade-in-left stagger-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>40 ans, deux enfants, une maison à crédit, des idées, une envie, qu'ont-ils fait ces 20 dernières années?</span>
                </div>
                <div className="flex items-start space-x-3 fade-in-left stagger-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Quels sont les éléments chiffrés de leur business model?</span>
                </div>
                <div className="flex items-start space-x-3 fade-in-left stagger-1">
                  <div className="w-2 h-2 bg-pink-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Comment financent-ils le développement de l'application native?</span>
                </div>
                <div className="flex items-start space-x-3 fade-in-left stagger-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Comment l'application peut devenir virale et quel est l'objectif en terme de traction?</span>
                </div>
                <div className="flex items-start space-x-3 fade-in-left stagger-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Un développement à l'international est-il anticipé?</span>
                </div>
                <div className="flex items-start space-x-3 fade-in-left stagger-4">
                  <div className="w-2 h-2 bg-pink-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ont-ils d'autres idées ou projets en cours?</span>
                </div>
                <div className="flex items-start space-x-3 fade-in-left stagger-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ont-ils vraiment besoin d'un investisseur?</span>
                </div>
                <div className="flex items-start space-x-3 fade-in-left stagger-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Que peut-on leur apporter?</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600/20 via-pink-600/20 to-purple-600/20 p-8 rounded-2xl border border-gray-400 text-center scale-in stagger-3 hover-lift">
              <p className="text-xl font-semibold text-gray-800 leading-relaxed">
                Nous espérons plus que tout que ce sont des questions<br />auxquelles vous aimeriez avoir des réponses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Download */}
      <section className="py-20 px-4 relative overflow-hidden bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Contact Form */}
            <div className="bg-black/70 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 shadow-xl">
              <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Contact
              </h3>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-800/60 to-blue-900/60 p-4 rounded-xl border border-blue-600 text-center">
                  <h4 className="text-lg font-bold text-blue-200 mb-1">Romain Mannino</h4>
                  <p className="text-blue-300 font-semibold">📞 06 46 01 62 43</p>
                </div>
                <div className="bg-gradient-to-r from-pink-800/60 to-pink-900/60 p-4 rounded-xl border border-pink-600 text-center">
                  <h4 className="text-lg font-bold text-pink-200 mb-1">Mickaël Jacob</h4>
                  <p className="text-pink-300 font-semibold">📞 06 40 09 18 78</p>
                </div>
              </div>
                
                <div className="bg-gradient-to-r from-purple-800/60 to-indigo-800/60 p-6 rounded-xl border border-purple-600 text-center">
                  <h4 className="text-lg font-bold text-purple-200 mb-2">Email</h4>
                  <p className="text-purple-300 font-semibold text-lg">📧 onlivetv@gmail.com</p>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-800 border border-gray-600 p-4 rounded-xl">
                <p className="text-gray-300 text-sm leading-relaxed text-center">
                  En cas d'appel téléphonique sans réponse pour solliciter un rendez-vous, merci de laisser un message 
                  sans oublier de mentionner vos coordonnées et nous vous rappellerons dans les plus brefs délais <span className="text-lg">😉</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-t from-black via-gray-900/80 to-gray-900/40 border-t border-gray-700">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="https://gqclmjeeiwoqrphcbipg.supabase.co/storage/v1/object/public/pitch/Copie%20de%20On%20Live%20(2).png" 
              alt="OnLive Logo"
              className="h-36 w-auto"
            />
          </div>
          <p className="text-gray-300 mb-4">"You'll never watch alone"</p>
          <p className="text-sm text-gray-500">
            © 2025 OnLive. Tous droits réservés.
          </p>
        </div>
      </footer>

     {/* Image Modal */}
     {showImageModal && (
       <div 
         className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
         onClick={() => setShowImageModal(false)}
       >
         <div className="relative max-w-4xl max-h-full">
           <button
             onClick={() => setShowImageModal(false)}
             className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
           >
             <X className="w-8 h-8" />
           </button>
           <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
             <img 
               src="https://gqclmjeeiwoqrphcbipg.supabase.co/storage/v1/object/public/pitch/disc%20whatasapp.png" 
               alt="Discussion WhatsApp - Vue agrandie"
               className="w-full h-auto object-contain"
               onClick={(e) => e.stopPropagation()}
             />
           </div>
           <p className="text-white text-center mt-4 text-sm opacity-75">
             Cliquez en dehors de l'image ou sur ✕ pour fermer
           </p>
         </div>
       </div>
     )}
    </div>
  );
}

export default App;