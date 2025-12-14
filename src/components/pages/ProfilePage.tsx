import { useMember } from '@/integrations';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';

export default function ProfilePage() {
  const { member, actions } = useMember();

  return (
    <div className="w-full min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full bg-secondary py-16">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-secondary-foreground mb-4">
              My Profile
            </h1>
            <p className="text-lg font-paragraph text-secondary-foreground/80">
              Manage your account information
            </p>
          </motion.div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="w-full py-16">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 md:p-12">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-10 pb-10 border-b border-secondary/10">
                  <div className="w-24 h-24 bg-primary/10 flex items-center justify-center">
                    {member?.profile?.photo?.url ? (
                      <Image src={member.profile.photo.url} alt={member?.profile?.nickname || 'Profile'} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-primary" />
                    )}
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h2 className="text-3xl font-heading font-bold text-secondary mb-2">
                      {member?.profile?.nickname ||
                        member?.contact?.firstName ||
                        'User'}
                    </h2>
                    {member?.isAdmin && (
                      <div className="flex items-center gap-2 justify-center md:justify-start">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-sm font-paragraph text-primary font-semibold">
                          Administrator
                        </span>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    onClick={actions.logout}
                    className="gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>

                {/* Profile Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-heading font-bold text-secondary mb-6">
                    Account Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {member?.contact?.firstName && (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-paragraph text-secondary/60 mb-1">
                            First Name
                          </p>
                          <p className="text-base font-paragraph text-secondary font-semibold">
                            {member.contact.firstName}
                          </p>
                        </div>
                      </div>
                    )}

                    {member?.contact?.lastName && (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-paragraph text-secondary/60 mb-1">
                            Last Name
                          </p>
                          <p className="text-base font-paragraph text-secondary font-semibold">
                            {member.contact.lastName}
                          </p>
                        </div>
                      </div>
                    )}

                    {member?.loginEmail && (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-paragraph text-secondary/60 mb-1">
                            Email
                          </p>
                          <p className="text-base font-paragraph text-secondary font-semibold break-all">
                            {member.loginEmail}
                          </p>
                        </div>
                      </div>
                    )}

                    {member?.contact?.phones && member.contact.phones.length > 0 && (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-paragraph text-secondary/60 mb-1">
                            Phone
                          </p>
                          <p className="text-base font-paragraph text-secondary font-semibold">
                            {member.contact.phones[0]}
                          </p>
                        </div>
                      </div>
                    )}

                    {member?._createdDate && (
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-paragraph text-secondary/60 mb-1">
                            Member Since
                          </p>
                          <p className="text-base font-paragraph text-secondary font-semibold">
                            {new Date(member._createdDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Admin Link */}
                {member?.isAdmin && (
                  <div className="mt-10 pt-10 border-t border-secondary/10">
                    <Link to="/admin">
                      <Button size="lg" className="w-full md:w-auto">
                        Go to Admin Dashboard
                      </Button>
                    </Link>
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
