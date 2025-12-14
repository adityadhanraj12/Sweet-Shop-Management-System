import { Link, useLocation } from 'react-router-dom';
import { useMember } from '@/integrations';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MiniCart } from '@/wix-verticals/react-pages/react-router/routes/root';

export default function Header() {
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-background border-b border-secondary/10">
      <div className="max-w-[120rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-heading font-bold text-secondary">
              SweetShop
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-paragraph transition-colors ${
                isActive('/') ? 'text-primary font-semibold' : 'text-secondary hover:text-primary'
              }`}
            >
              HOME
            </Link>
            <Link
              to="/store"
              className={`text-sm font-paragraph transition-colors ${
                isActive('/store') || location.pathname.startsWith('/store/') || location.pathname.startsWith('/products/')
                  ? 'text-primary font-semibold'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              SHOP
            </Link>
            <Link
              to="/about"
              className={`text-sm font-paragraph transition-colors ${
                isActive('/about') ? 'text-primary font-semibold' : 'text-secondary hover:text-primary'
              }`}
            >
              ABOUT
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-paragraph transition-colors ${
                isActive('/contact') ? 'text-primary font-semibold' : 'text-secondary hover:text-primary'
              }`}
            >
              CONTACT
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <>
                    <Link to="/profile">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <User className="w-4 h-4" />
                        <span className="hidden sm:inline">
                          {member?.profile?.nickname || member?.contact?.firstName || 'Profile'}
                        </span>
                      </Button>
                    </Link>
                    {member?.isAdmin && (
                      <Link to="/admin">
                        <Button variant="outline" size="sm">
                          Admin
                        </Button>
                      </Link>
                    )}
                  </>
                ) : (
                  <Button onClick={actions.login} variant="ghost" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Button>
                )}
              </>
            )}
            
            {/* Mini Cart */}
            <MiniCart
              cartIcon={ShoppingCart}
              cartIconClassName="relative"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
