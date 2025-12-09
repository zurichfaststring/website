import { Resend } from 'resend';
import { render } from '@react-email/render';
import ClientBookingConfirmationFR from '@/emails/ClientBookingConfirmation.fr';
import ClientBookingConfirmationDE from '@/emails/ClientBookingConfirmation.de';
import ClientBookingConfirmationEN from '@/emails/ClientBookingConfirmation.en';
import AdminBookingNotification from '@/emails/AdminBookingNotification';
import { format } from 'date-fns';
import { fr, de, enUS } from 'date-fns/locale';

// Initialize Resend avec la clé API
const resend = new Resend(process.env.RESEND_API_KEY);

// Email de l'expéditeur (doit être vérifié sur Resend)
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@zurichfaststring.ch';

type BookingEmailData = {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  bookingDate: Date;
  timeSlot: string;
  racketBrand: string;
  racketModel?: string | null;
  stringPattern: string;
  tensionHorizontal: number;
  tensionVertical: number;
  tensionUnit: string;
  stringType: string;
  totalPrice: number;
  comments?: string | null;
  locale?: string;
};

const getTimeSlotLabel = (timeSlot: string, locale: string) => {
  const labels: any = {
    fr: {
      morning: 'Matin avant 10h',
      afternoon: 'Après-midi après 18h',
    },
    de: {
      morning: 'Vormittag vor 10 Uhr',
      afternoon: 'Nachmittag nach 18 Uhr',
    },
    en: {
      morning: 'Morning before 10am',
      afternoon: 'Afternoon after 6pm',
    },
  };
  
  return labels[locale]?.[timeSlot] || labels.en[timeSlot] || timeSlot;
};

const getDateLocale = (locale: string) => {
  return locale === 'de' ? de : locale === 'fr' ? fr : enUS;
};

export async function sendBookingConfirmationEmails(booking: BookingEmailData) {
  try {
    const locale = booking.locale || 'en';
    const dateLocale = getDateLocale(locale);
    
    // Format data for emails
    const formattedDate = format(booking.bookingDate, 'PPP', { locale: dateLocale });
    const formattedTimeSlot = getTimeSlotLabel(booking.timeSlot, locale);
    const tension = `${booking.tensionHorizontal}/${booking.tensionVertical} ${booking.tensionUnit}`;
    
    // 1. Send confirmation email to client - Choose the right template
    const clientEmailComponent = locale === 'de' 
      ? ClientBookingConfirmationDE
      : locale === 'fr'
      ? ClientBookingConfirmationFR
      : ClientBookingConfirmationEN;
    
    const clientEmailHtml = await render(
      clientEmailComponent({
        bookingId: booking.id,
        clientName: booking.clientName,
        bookingDate: formattedDate,
        timeSlot: formattedTimeSlot,
        racketBrand: booking.racketBrand,
        racketModel: booking.racketModel || undefined,
        stringPattern: booking.stringPattern,
        tension,
        stringType: booking.stringType,
        totalPrice: booking.totalPrice,
      }),
      {
        pretty: false,
      }
    );
    
    const clientSubject = locale === 'de' 
      ? 'Buchungsbestätigung - Zurich Fast String'
      : locale === 'fr'
      ? 'Confirmation de votre réservation - Zurich Fast String'
      : 'Booking Confirmation - Zurich Fast String';
    
    const clientEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: booking.clientEmail,
      subject: clientSubject,
      html: clientEmailHtml,
    });
    
    console.log('Client email sent:', clientEmailResult);
    
    // 2. Send notification email to admin (always in French)
    const adminEmailHtml = await render(
      AdminBookingNotification({
        bookingId: booking.id,
        clientName: booking.clientName,
        clientEmail: booking.clientEmail,
        clientPhone: booking.clientPhone,
        bookingDate: formattedDate,
        timeSlot: formattedTimeSlot,
        racketBrand: booking.racketBrand,
        racketModel: booking.racketModel || undefined,
        stringPattern: booking.stringPattern,
        tension,
        stringType: booking.stringType,
        totalPrice: booking.totalPrice,
        comments: booking.comments || undefined,
        locale: 'fr', // Force admin emails to always be in French
      }),
      {
        pretty: false,
      }
    );
    
    const adminEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `Nouvelle réservation de ${booking.clientName}`,
      html: adminEmailHtml,
    });
    
    console.log('Admin email sent:', adminEmailResult);
    
    return {
      success: true,
      clientEmailId: clientEmailResult.data?.id,
      adminEmailId: adminEmailResult.data?.id,
    };
  } catch (error) {
    console.error('Error sending booking confirmation emails:', error);
    // Don't throw error - we don't want email failure to block booking creation
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

