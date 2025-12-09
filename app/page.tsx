"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Sparkles, Award, BadgeCheck } from "lucide-react";
import Logo from "@/components/Logo";
import { RacketIcon, TennisBallIcon } from "@/components/icons/TennisIcons";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "@/lib/translations";

export default function Home() {
  const t = useTranslations();
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-pale via-white to-slate-50">
      {/* Navigation */}
      <nav className="border-b bg-white/90 backdrop-blur-md sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-2 sm:px-4 py-2 flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
          <div className="flex gap-1 sm:gap-3 items-center">
            <LanguageSwitcher />
            <Link href="/booking">
              <Button size="lg" className="bg-brand hover:bg-brand-dark shadow-lg hover:shadow-xl transition-all text-sm sm:text-base px-4 sm:px-8 py-4 sm:py-6 text-white font-bold">
                {t("nav.reserve")}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 pt-8 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        {/* Fond décoratif */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-brand-light rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-pale text-slate-800 px-4 py-2 rounded-full text-sm font-semibold mb-6 border-2 border-brand">
            <TennisBallIcon />
            <span>{t("hero.badge")}</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight min-h-hero-title flex flex-col justify-center">
            <span>{t("hero.title")}</span>
            <span className="text-brand"> {t("hero.titleHighlight")}</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t("hero.description")} 
            <span className="font-semibold text-slate-900"> {t("hero.descriptionHighlight")}</span>
          </p>
          <div className="flex flex-col gap-6 justify-center items-center">
            <Link href="/booking">
              <Button size="lg" className="text-lg px-10 py-7 bg-brand hover:bg-brand-dark shadow-2xl hover:shadow-3xl transition-all hover:scale-105 text-white font-bold">
                {t("hero.reserveNow")}
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-slate-600">
              <BadgeCheck className="w-5 h-5 text-brand" />
              <span className="text-sm font-medium">{t("hero.priceInfo")}</span>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-brand-pale border-2 border-brand rounded-xl p-4 max-w-xl mx-auto">
                <p className="text-sm font-semibold text-slate-900 mb-2">{t("hero.location")}</p>
                <p className="text-xs text-slate-600 italic">{t("hero.locationDetails")}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium mb-2">{t("hero.contactTitle")}</p>
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
                  <a href="https://wa.me/41782074677" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-700 hover:text-brand-darker transition-colors font-medium">
                    <span className="text-base">📱 +41 78 207 46 77</span>
                  </a>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <a href="mailto:info@zurichfaststring.ch" className="flex items-center gap-2 text-slate-700 hover:text-blue-700 transition-colors font-medium">
                    <span className="text-base">📧 info@zurichfaststring.ch</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-20 border-t-2 border-slate-100">
        <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("howItWorks.title")}</h3>
            <p className="text-lg text-slate-600">{t("howItWorks.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            <div className="relative group">
              <div className="bg-gradient-to-br from-brand-pale to-white rounded-2xl p-8 border-2 border-brand hover:border-brand-dark transition-all hover:shadow-xl min-h-step-card flex flex-col">
                <div className="flex items-center justify-center w-16 h-16 bg-brand text-white rounded-2xl font-bold text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform" style={{backgroundColor: '#b1cb29'}}>
                  1
                </div>
                <div className="mb-4">
                  <Calendar className="w-8 h-8 text-brand-darker mb-2" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 min-h-[32px]">{t("howItWorks.step1.title")}</h4>
                <p className="text-slate-600 leading-relaxed flex-1">{t("howItWorks.step1.description")}</p>
              </div>
              {/* Flèche décorative */}
              <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-full ml-2 lg:ml-4 text-brand">
                <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>

            <div className="relative group">
              <div className="bg-gradient-to-br from-brand-pale to-white rounded-2xl p-8 border-2 border-brand hover:border-brand-dark transition-all hover:shadow-xl min-h-step-card flex flex-col">
                <div className="flex items-center justify-center w-16 h-16 bg-brand text-white rounded-2xl font-bold text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform" style={{backgroundColor: '#b1cb29'}}>
                  2
                </div>
                <div className="mb-4">
                  <RacketIcon className="w-8 h-8 text-brand-darker" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 min-h-[32px]">{t("howItWorks.step2.title")}</h4>
                <p className="text-slate-600 leading-relaxed flex-1">{t("howItWorks.step2.description")}</p>
              </div>
              {/* Flèche décorative */}
              <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-full ml-2 lg:ml-4 text-brand">
                <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>

            <div className="group">
              <div className="bg-gradient-to-br from-brand-pale to-white rounded-2xl p-8 border-2 border-brand hover:border-brand-dark transition-all hover:shadow-xl min-h-step-card flex flex-col">
                <div className="flex items-center justify-center w-16 h-16 bg-brand text-white rounded-2xl font-bold text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform" style={{backgroundColor: '#b1cb29'}}>
                  3
                </div>
                <div className="mb-4">
                  <Award className="w-8 h-8 text-brand-darker mb-2" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 min-h-[32px]">{t("howItWorks.step3.title")}</h4>
                <p className="text-slate-600 leading-relaxed flex-1">{t("howItWorks.step3.description")}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-20 border-t-2 border-slate-200">
        <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t("features.title")}</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t("features.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="border-2 hover:border-brand transition-all hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-brand-pale/30 group min-h-feature-card flex flex-col">
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-3 text-lg min-h-[80px]">
                <div className="p-3 bg-gradient-to-br from-brand-lighter to-brand-light rounded-xl group-hover:scale-110 transition-transform">
                  <RacketIcon />
                </div>
                <span className="text-slate-900">{t("features.price.title")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center flex-1 flex flex-col justify-center">
              <p className="text-3xl font-bold text-brand-darker mb-2">{t("features.price.value")}</p>
              <p className="text-sm text-slate-600 min-h-[40px]" dangerouslySetInnerHTML={{__html: t("features.price.description")}}></p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-brand transition-all hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-brand-pale/30 group min-h-feature-card flex flex-col">
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-3 text-lg min-h-[80px]">
                <div className="p-3 bg-gradient-to-br from-brand-lighter to-brand-light rounded-xl group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-brand-darker" />
                </div>
                <span className="text-slate-900">{t("features.speed.title")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center flex-1 flex flex-col justify-center">
              <p className="text-3xl font-bold text-brand-darker mb-2">{t("features.speed.value")}</p>
              <p className="text-sm text-slate-600 min-h-[40px]" dangerouslySetInnerHTML={{__html: t("features.speed.description")}}></p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-brand transition-all hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-brand-pale/30 group min-h-feature-card flex flex-col">
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-3 text-lg min-h-[80px]">
                <div className="p-3 bg-gradient-to-br from-brand-lighter to-brand-light rounded-xl group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-brand-darker" />
                </div>
                <span className="text-slate-900">{t("features.local.title")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center flex-1 flex flex-col justify-center">
              <p className="text-3xl font-bold text-brand-darker mb-2">{t("features.local.value")}</p>
              <p className="text-sm text-slate-600 min-h-[40px]" dangerouslySetInnerHTML={{__html: t("features.local.description")}}></p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-brand transition-all hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-brand-pale/30 group min-h-feature-card flex flex-col">
            <CardHeader>
              <CardTitle className="flex flex-col items-center gap-3 text-lg min-h-[80px]">
                <div className="p-3 bg-gradient-to-br from-brand-lighter to-brand-light rounded-xl group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-brand-darker" />
                </div>
                <span className="text-slate-900">{t("features.booking.title")}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center flex-1 flex flex-col justify-center">
              <p className="text-3xl font-bold text-brand-darker mb-2">{t("features.booking.value")}</p>
              <p className="text-sm text-slate-600 min-h-[40px]" dangerouslySetInnerHTML={{__html: t("features.booking.description")}}></p>
            </CardContent>
          </Card>
        </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden bg-white border-t-2 border-slate-100">
        <div className="container mx-auto px-4">
        <div className="absolute inset-0 bg-brand-pale rounded-3xl"></div>
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand border-2 border-brand-dark text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <TennisBallIcon />
            <span>{t("cta.badge")}</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t("cta.title")}</h3>
          <p className="text-xl text-slate-700 mb-10 leading-relaxed">
            {t("cta.description")}
          </p>
          <div className="flex justify-center">
            <Link href="/booking">
              <Button size="lg" className="text-lg px-10 py-7 bg-brand hover:bg-brand-dark text-white font-bold shadow-2xl hover:shadow-3xl transition-all hover:scale-105">
                {t("cta.reserve")}
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-700">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-brand-darker" />
              <span className="text-sm font-medium">{t("cta.paymentInfo")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-darker" />
              <span className="text-sm font-medium">{t("cta.deliveryInfo")}</span>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gradient-to-b from-slate-100 to-slate-200">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <Logo />
              </div>
              <p className="text-sm text-slate-600">{t("footer.description")}</p>
            </div>
            <div>
              <h5 className="font-semibold text-slate-900 mb-4">{t("footer.quickLinks")}</h5>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link href="/" className="hover:text-brand transition-colors">{t("footer.home")}</Link></li>
                <li><Link href="/booking" className="hover:text-brand transition-colors">{t("footer.booking")}</Link></li>
                <li><Link href="/admin" className="hover:text-brand transition-colors">{t("footer.admin")}</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-slate-900 mb-4">{t("footer.contactTitle")}</h5>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>📧 <a href="mailto:info@zurichfaststring.ch" className="hover:text-brand transition-colors">info@zurichfaststring.ch</a></li>
                <li>📱 <a href="https://wa.me/41782074677" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors">+41 78 207 46 77 (WhatsApp)</a></li>
                <li>📍 {t("footer.location")}</li>
                <li className="text-xs italic text-slate-500">{t("footer.locationNote")}</li>
                <li>⏰ {t("footer.schedule")}</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-slate-600">
            <p className="text-sm">{t("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
