import { useState, useEffect } from 'react';
import { COLORS, FONT, RADIUS, SPACING } from './lib/constants';
import { saveProfile, loadProfile, saveExpenses, loadExpenses, Expense } from './lib/storage';
import { AuthProvider, useAuth } from './components/AuthContext';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import WelcomeScreen from './components/WelcomeScreen';
import ProfileScreen from './components/ProfileScreen';
import HomeScreen from './components/HomeScreen';
import AddScreen from './components/AddScreen';
import ExpenseDetailScreen from './components/ExpenseDetailScreen';
import StatsScreen from './components/StatsScreen';

type Tab = 'home' | 'add' | 'stats' | 'profile';

const TABS: { key: Tab; label: string; emoji: string }[] = [
  { key: 'home', label: 'Home', emoji: '🏠' },
  { key: 'add', label: 'Add', emoji: '➕' },
  { key: 'stats', label: 'Stats', emoji: '📊' },
  { key: 'profile', label: 'Profile', emoji: '👤' },
];

function AuthenticatedApp() {
  const { user } = useAuth();

  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [selectedCategory] = useState('all');

  const [profile, setProfile] = useState({
    name: '',
    budget: 15000,
  });

  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    if (!user) return;

    const savedProfile = loadProfile(user.uid);
    const savedExpenses = loadExpenses(user.uid);

    setProfile(savedProfile);
    setExpenses(savedExpenses);

    if (savedProfile.name) {
      setShowWelcome(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    saveExpenses(user.uid, expenses);
  }, [expenses, user]);

  const handleProfileUpdate = (name: string, budget: number) => {
    setProfile({ name, budget });
    if (user) {
      saveProfile(user.uid, name, budget);
    }
  };

  const handleAddExpense = (expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  if (showWelcome) {
    return <WelcomeScreen onGetStarted={() => setShowWelcome(false)} />;
  }

  if (selectedExpense) {
    return (
      <ExpenseDetailScreen
        expense={selectedExpense}
        onBack={() => setSelectedExpense(null)}
        onDelete={handleDeleteExpense}
      />
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: COLORS.bg,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{ flex: 1, paddingBottom: 72 }}>
        {activeTab === 'home' && (
          <HomeScreen
            expenses={expenses}
            onSelectExpense={setSelectedExpense}
          />
        )}

        {activeTab === 'add' && (
          <AddScreen
            onAdd={handleAddExpense}
            onNavigateHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'stats' && (
          <StatsScreen
            expenses={expenses}
            selectedCategory={selectedCategory}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileScreen
            expenses={expenses}
            profile={profile}
            onProfileUpdate={handleProfileUpdate}
          />
        )}
      </div>

      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 72,
          backgroundColor: COLORS.surface,
          borderTop: `1px solid ${COLORS.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          zIndex: 100,
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setSelectedExpense(null);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                padding: `${SPACING.sm}px ${SPACING.md}px`,
                borderRadius: RADIUS.md,
                border: 'none',
                background: isActive ? COLORS.primarySoft : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                minWidth: 64,
              }}
            >
              <span style={{ fontSize: 22 }}>{tab.emoji}</span>
              <span
                style={{
                  fontSize: FONT.xs,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? COLORS.primary : COLORS.textMuted,
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? (
    <LoginScreen onSwitchToSignUp={() => setIsLogin(false)} />
  ) : (
    <SignUpScreen onSwitchToLogin={() => setIsLogin(true)} />
  );
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: COLORS.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: SPACING.lg }}>💸</div>
          <div style={{ color: COLORS.textMuted, fontSize: FONT.md }}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return user ? <AuthenticatedApp /> : <AuthScreen />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}