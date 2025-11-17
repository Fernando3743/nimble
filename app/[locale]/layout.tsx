import type { Metadata } from 'next';
import { Instrument_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n/config';
import { QueryProvider } from '@/lib/react-query/QueryProvider';
import { ToastProvider } from '@/components/ToastProvider';
import { LocaleSync } from '@/components/LocaleSync';
import '../globals.css';

const instrumentSans = Instrument_Sans({
  variable: '--font-instrument-sans',
  subsets: ['latin'],
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      languages: {
        'en': '/en',
        'es': '/es',
        'fr': '/fr',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale,
      alternateLocale: locales.filter(l => l !== locale),
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming locale is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${instrumentSans.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <LocaleSync />
            {children}
            <ToastProvider />
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
